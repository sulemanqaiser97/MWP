import { iPayload } from "./interface/payload.interface";

export interface IAuth {
    generateJwt: (payload: iPayload) => string;
    validateJwt: (payload: string) => Promise<iPayload>;
}
