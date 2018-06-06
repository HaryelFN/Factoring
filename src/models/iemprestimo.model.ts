import { Icheque } from "./icheque.model";

export interface Iemprestimo {
    id?: string,
    data: number,
    cheques: Array<Icheque>,
    tx_juros: number,
    t_bruto: number,
    t_desconto: number,
    t_liquido: number
}