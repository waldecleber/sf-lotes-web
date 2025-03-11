import { Cliente } from "./cliente-model";
import { Financiamento } from "./financiamento-model";
import { Loteamento } from "./loteamento-model";

export class Lote {
    id!: number;
    valor!: number;
    numero!: number;
    loteamento!: Loteamento;
    cliente!: Cliente;
    financiamento!: Financiamento;
}