import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {BarcodeFormat} from '@zxing/library';
import {EnrollmentService} from '../../core/service/enrollment-service';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {NgClass} from '@angular/common';
import {finalize} from 'rxjs';
import {ValidationResult} from '../../core/types/ValidationResult';
import {QrCodeData} from '../../core/types/QRCodeData';


@Component({
  selector: 'app-check-in-scanner',
  standalone: true,
  imports: [
    ZXingScannerModule,
    NgClass,
  ],
  templateUrl: './check-in-scanner.html',
  styleUrl: './check-in-scanner.scss'
})
export class CheckInScanner {
  private assetService = inject(EnrollmentService);
  private cdr = inject(ChangeDetectorRef);
  allowedFormats = [BarcodeFormat.QR_CODE];
  scannerEnabled = true;
  isProcessing = false;
  hasPermission: boolean | undefined;
  validationResult: ValidationResult | null = null;
  scannedParticipantName: string | null = null;

  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
  }

  onScanSuccess(qrCodeString: string) {
    if (this.isProcessing || !this.scannerEnabled) {
      return;
    }

    try {
      const qrData: QrCodeData = JSON.parse(qrCodeString);

      if (!qrData || !qrData.uniqueToken) {
        throw new Error("QR Code com formato inválido.");
      }

      this.isProcessing = true;
      this.scannerEnabled = false;
      this.scannedParticipantName = qrData.participantName;
      this.cdr.detectChanges();
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
            this.validationResult = {
              message: apiResponse.message,
              participantName: apiResponse.participantName,
              eventName: apiResponse.eventName,
              cssClass: cssClass
            };
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.validationResult = {message: err.error?.message || 'QR Code inválido', cssClass: 'error'};
            this.cdr.detectChanges();
          }
        });
    } catch (e) {
      this.isProcessing = false;
      this.scannerEnabled = false;
      this.validationResult = {message: 'Formato do QR Code inválido.', cssClass: 'error'};
      this.cdr.detectChanges();
    }
  }

  resetScanner() {
    this.validationResult = null;
    this.scannerEnabled = true;
    this.cdr.detectChanges();
  }
}
