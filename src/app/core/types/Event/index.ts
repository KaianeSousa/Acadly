export interface Event {
  id?: number | null;
  name: string;
  description: string;
  initialDateTime: string;
  finalDateTime: string;
  local: string;
  workload: number;
  isActive: boolean;
}
