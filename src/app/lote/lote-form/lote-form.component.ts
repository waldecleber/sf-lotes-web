import { Component } from '@angular/core';
import { Endereco } from 'src/app/model/endereco-model';
import { Estado } from 'src/app/model/estado-model';
import { Lote } from 'src/app/model/lote-model';
import { LocalidadeService } from 'src/app/services/localidade.service';

@Component({
  selector: 'app-lote-form',
  templateUrl: './lote-form.component.html',
  styleUrls: ['./lote-form.component.css']
})
export class LoteFormComponent {


  lote = new Lote;
    endereco = new Endereco;
    estados: Estado[] = [];
    cidades: any[] = [];
    estadoSelecionado!: string;
    cidadeSelecionada!: string;

    constructor(private localidadeService: LocalidadeService) {
    
      }
    
      onChangeEstado(estado: string) {
        this.estadoSelecionado = estado;
        console.log(this.estadoSelecionado);
        // this.listarCidades(this.estadoSelecionado);
      }
    
      onChangeCidade(cidade: string) {
        this.cidadeSelecionada = cidade;
        console.log(this.cidadeSelecionada);
        this.endereco.cidade = this.cidadeSelecionada;
      }

}
