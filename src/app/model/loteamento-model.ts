import { Endereco } from "./endereco-model";
import { Lote } from "./lote-model";

export class Loteamento {
    id!: number;
    nome!: string;
    endereco!: Endereco;
    lotes!: Lote[];

}