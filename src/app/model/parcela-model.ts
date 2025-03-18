import { Cliente } from "./cliente-model";
import { Financiamento } from "./financiamento-model";
import { Lote } from "./lote-model";

export class Parcela {
    id!: number;
    numeroParcela!: number;
    lote!: Lote;
    cliente!: Cliente;
    financiamento!: Financiamento;
    dataPagamento!: string;
    dataVencimento!: string;
    valor!: number;
    status!: string;
}