import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {JsonPipe, NgClass} from '@angular/common';
import {CheckInScanner} from '../../../components/check-in-scanner/check-in-scanner';
import {ValidationResult} from '../../../core/types/ValidationResult';

@Component({
  selector: 'app-qrcode-check-in',
  standalone: true, imports: [
    CheckInScanner,
    NgClass
  ],
  templateUrl: './qrcode-check-in.html',
  styleUrl: './qrcode-check-in.scss'
})
export class QrcodeCheckIn {
  private cdr = inject(ChangeDetectorRef);

  isScannerActive = false;
  hasCameraPermission: boolean | undefined;
  validationResult: ValidationResult | null = null;

  startScanner() {
    this.validationResult = null;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.isScannerActive = true;
      this.cdr.detectChanges();
    }, 100);
  }

  stopScanner() {
    this.isScannerActive = false;
  }

  onScanResult(result: ValidationResult) {
    this.validationResult = result;
    this.isScannerActive = false;
    this.cdr.detectChanges();
  }

  onPermissionChange(permission: boolean) {
    this.hasCameraPermission = permission;
  }
}
