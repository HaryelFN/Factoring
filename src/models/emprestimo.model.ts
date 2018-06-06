import { Iemprestimo } from "./iemprestimo.model";
import { Cheque } from "./cheque.model";

export class Emprestimo implements Iemprestimo {
    id?: string;
    data: number;
    cheques: Cheque[];
    tx_juros: number;
    t_bruto: number;
    t_desconto: number;
    t_liquido: number;

    constructor() {
        this.data = Date.now();
        this.cheques = [];
        this.tx_juros = 0;
        this.t_bruto = 0;
        this.t_desconto = 0;
        this.t_liquido = 0;
     }
}