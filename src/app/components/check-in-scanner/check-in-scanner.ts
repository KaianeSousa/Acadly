import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {BarcodeFormat} from '@zxing/library';
import {EnrollmentService} from '../../core/service/enrollment-service';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {finalize} from 'rxjs';
import {ValidationResult} from '../../core/types/ValidationResult';
import {QrCodeData} from '../../core/types/QRCodeData';


@Component({
  selector: 'app-check-in-scanner',
  imports: [
    ZXingScannerModule,
  ],
  templateUrl: './check-in-scanner.html',
  styleUrl: './check-in-scanner.scss'
})
export class CheckInScanner {
  private assetService = inject(EnrollmentService);
  private cdr = inject(ChangeDetectorRef);

  @Input() enable = false;
  @Output() scanResult = new EventEmitter<ValidationResult>();
  @Output() permissionChange = new EventEmitter<boolean>();

  allowedFormats = [BarcodeFormat.QR_CODE];
  isProcessing = false;
  hasPermission: boolean | undefined;
  scannedParticipantName: string | null = null;

  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
    this.permissionChange.emit(permission);
  }

  onScanSuccess(qrCodeString: string) {
    if (this.isProcessing || !this.enable) {
      return;
    }

    try {
      const qrData: QrCodeData = JSON.parse(qrCodeString);
      if (!qrData || !qrData.uniqueToken) {
        throw new Error("QR Code com formato inválido.");
      }

      this.isProcessing = true;
      this.scannedParticipantName = qrData.participantName;

      this.assetService.validateToken(qrData.uniqueToken)
        .pipe(
          finalize(() => {
            this.isProcessing = false;
            this.scannedParticipantName = null;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (apiResponse) => {
            let cssClass: 'success' | 'error' | 'warning' = 'success';
            if (apiResponse.status.includes('JÁ REGISTRADO') || apiResponse.status.includes('NÃO INICIADO') || apiResponse.status.includes('ENCERRADO')) {
              cssClass = 'warning';
            }
            this.scanResult.emit({
              message: apiResponse.message,
              participantName: apiResponse.participantName,
              eventName: apiResponse.eventName,
              cssClass: cssClass
            });
          },
          error: (err) => {
            this.scanResult.emit({ message: err.error?.message || 'QR Code inválido', cssClass: 'error' });
          }
        });
    } catch (e) {
      this.isProcessing = false;
      this.scanResult.emit({ message: 'Formato do QR Code inválido.', cssClass: 'error' });
    }
  }
}
