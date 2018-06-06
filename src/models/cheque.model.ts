import { Icheque } from './icheque.model';

export class Cheque implements Icheque {

    id?: string;
    valor: number;
    data: string;
    cruzado: boolean;
    descontado?: boolean;

    constructor() {
        this.valor = 0;
        this.cruzado = false;
        this.descontado = false
    }

}