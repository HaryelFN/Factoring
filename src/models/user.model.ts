import { Iuser } from './iuser.model';
export class User implements Iuser {
    uid?: string;
    tipo: string;

    constructor() {
        this.tipo = 'free';
    }
}