import { Cliente } from "./cliente-model";
import { Lote } from "./lote-model";

export class Financiamento {
    id!: number;

    lote!: Lote;

    cliente!: Cliente;

    dataCompra!: string;

    valorTotal!: number;

    qtdeParcelas!: number;

    parcelasPagas!: number;

    parcelasRestantes!: number;

    totalPago!: number;

    faltaPagar!: number;

    valorParcela!: number;
}