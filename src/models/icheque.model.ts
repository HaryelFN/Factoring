export interface Icheque {
    id?: string,
    valor: number,
    data: string,
    cruzado: boolean,
    descontado?: boolean
}