import { JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Endereco } from 'src/app/model/endereco-model';
import { Estado } from 'src/app/model/estado-model';
import { Financiamento } from 'src/app/model/financiamento-model';
import { Lote } from 'src/app/model/lote-model';
import { Loteamento } from 'src/app/model/loteamento-model';
import { LocalidadeService } from 'src/app/services/localidade.service';
import { LoteamentoService } from 'src/app/services/loteamento.service';

import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Cliente } from 'src/app/model/cliente-model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FinanciamentoService } from 'src/app/services/financiamento.service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-financiamento-form',
  templateUrl: './financiamento-form.component.html',
  styleUrls: ['./financiamento-form.component.css'],
  imports: [NgbDatepickerModule, FormsModule, JsonPipe, NgFor, RouterLink],
  standalone: true
})
export class FinanciamentoFormComponent implements OnInit {

    financiamento = new Financiamento;

    loteamentoSelecionado = new Loteamento;
    loteamentos: Loteamento[] = [];
    lote = new Lote;
    endereco = new Endereco;
    estados: Estado[] = [];
    cidades: any[] = [];
    estadoSelecionado!: string;
    cidadeSelecionada!: string;
    cliente = new Cliente;
    finalDate!: string;
    cpf!: any;
    dataCompra!: NgbDateStruct;
    
  
    constructor(
      private localidadeService: LocalidadeService, 
      private loteamentoService: LoteamentoService, 
      private clienteService: ClienteService,
      private financiamentoService: FinanciamentoService,
      private router: Router, private _route: ActivatedRoute) {
      this.estadoSelecionado = 'AM';
    }
    ngOnInit(): void {
      this.buscarCliente();
      this.listarLoteamentos();
      this.listarEstados();
      this.estadoSelecionado = 'AM';
      this.listarCidades(this.estadoSelecionado);
    }

    buscarCliente() {
      this.cpf = this._route.snapshot.paramMap.get('cpf');
      console.log("cpf", this.cpf);
    if(this.cpf != null) {
      this.clienteService.buscarClientePorCpf(this.cpf)
        .subscribe(data => { 
          this.cliente = data;
      },
      error => {
         console.log(error);
      });
    } 
    }

    listarLoteamentos() {
      this.loteamentoService.listarLoteamentos().subscribe(
        resp => {
          this.loteamentos = resp;
          
        }
      )
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
  
    onChangeLoteamento(item: Loteamento) {
      this.lote.cliente = this.cliente;
      this.lote.loteamento = item;
      this.financiamento.lote = this.lote;
      
    }
  
    onChangeCidade(cidade: string) {
      this.cidadeSelecionada = cidade;
      this.endereco.cidade = this.cidadeSelecionada;
    }

    onDateSelect(event: any) {      
      let year = event.year;
      let month = event.month <= 9 ? '0' + event.month : event.month;;
      let day = event.day <= 9 ? '0' + event.day : event.day;;
      this.finalDate = year + "-" + month + "-" + day;
      this.financiamento.dataCompra = this.finalDate;
     }

    salvarFinanciamento() {
      this.financiamento.cliente = this.cliente;
      this.financiamento.parcelasPagas = 0;
      this.financiamento.parcelasRestantes = this.financiamento.qtdeParcelas;
      this.financiamento.totalPago = 0;
      this.financiamento.faltaPagar = this.financiamento.valorTotal;
      console.log("financiamento", this.financiamento);
      this.financiamentoService.salvarCliente(this.financiamento).subscribe(resp => {
        this.router.navigate(['/clientes']);
      });

    }
    
}
