export interface Event {
    id?: number | null;
    name: string;
    description: string;
    initialDate: string;
    finalDate: string;
    local: string;
    isActive: boolean;
}
