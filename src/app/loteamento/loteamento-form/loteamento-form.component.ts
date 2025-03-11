import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/model/endereco-model';
import { Estado } from 'src/app/model/estado-model';
import { Financiamento } from 'src/app/model/financiamento-model';
import { Loteamento } from 'src/app/model/loteamento-model';
import { LocalidadeService } from 'src/app/services/localidade.service';
import { LoteamentoService } from 'src/app/services/loteamento.service';

@Component({
  selector: 'app-loteamento-form',
  templateUrl: './loteamento-form.component.html',
  styleUrls: ['./loteamento-form.component.css']
})
export class LoteamentoFormComponent implements OnInit {
  financiamento = new Financiamento;

  loteamento = new Loteamento;
  endereco = new Endereco;
  estados: Estado[] = [];
  cidades: any[] = [];
  estadoSelecionado!: string;
  cidadeSelecionada!: string;

  constructor(private localidadeService: LocalidadeService, private loteamentoService: LoteamentoService, private router: Router) {
    this.estadoSelecionado = 'AM';
  }
  ngOnInit(): void {
    this.listarEstados();
    this.estadoSelecionado = 'AM';
    this.listarCidades(this.estadoSelecionado);
  }

  salvarLoteamento() {
    this.loteamento.endereco = this.endereco;
    this.loteamentoService.salvarLoteamento(this.loteamento).subscribe(resp => {
      this.router.navigate(['/loteamentos']);
    });;
  }

  listarEstados() {
    this.localidadeService.listarEstados().subscribe(resp => {
      this.estados = resp;
    })
  }

  listarCidades(uf: string) {
    this.localidadeService.listarCidades(uf).subscribe(resp => {
      this.cidades = resp;
    })
  }

  onChangeEstado(estado: string) {
    this.estadoSelecionado = estado;
    this.listarCidades(this.estadoSelecionado);
  }

  onChangeCidade(cidade: string) {
    this.cidadeSelecionada = cidade;
    this.endereco.cidade = this.cidadeSelecionada;
  }

}
