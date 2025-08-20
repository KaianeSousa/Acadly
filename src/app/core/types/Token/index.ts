import { UserRoleEnum } from "../../enums/UserRoleEnum";

export interface DecodedToken {
    name: string;
    email: string;
    role: UserRoleEnum;
    [key: string]: unknown; 
  }
  