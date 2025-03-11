import { Estado } from "./estado-model";

export class Endereco {
    logradouro!: string;
    cep!: string;
    cidade!: string;
    estado!: Estado;
}