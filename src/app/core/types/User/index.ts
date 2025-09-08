export interface User {
    name : string;
    email : string;
    role: 'ADMIN' | 'EMPLOYEE' | 'PARTICIPANT';
}
