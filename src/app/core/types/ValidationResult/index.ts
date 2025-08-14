export interface ValidationResult {
  message: string;
  participantName?: string;
  eventName?: string;
  cssClass: 'success' | 'error' | 'warning';
}
