import { Endereco } from "./endereco-model";

export class Cliente {
    nome!: string;
    cpf!: string;
    endereco!: Endereco;
    cep!: string;
    celular!: string;
}