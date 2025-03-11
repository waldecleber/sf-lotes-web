import { AsyncPipe, CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbTypeaheadModule, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import { Observable, startWith, map } from 'rxjs';
import { Cliente } from 'src/app/model/cliente-model';
import { Financiamento } from 'src/app/model/financiamento-model';
import { Lote } from 'src/app/model/lote-model';
import { Loteamento } from 'src/app/model/loteamento-model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FinanciamentoService } from 'src/app/services/financiamento.service';


const CLIENTE: Cliente =
{
  nome: 'Joao',
  cpf: '123123',
  endereco: {
    logradouro: '',
    cep: '',
    cidade: '',
    estado: {
      sigla: ''
    }
  },
  cep: '',
  celular: ''
}

const LOTEAMENTO: Loteamento =
{
  nome: 'Vila Jardim',
  endereco: {
    logradouro: '',
    cep: '',
    cidade: '',
    estado: {
      sigla: ''
    }
  },
  id: 0,
   lotes: [{
      valor: 20000,
      financiamento: new Financiamento,
      numero: 10,
      loteamento: new Loteamento,
      cliente: CLIENTE,
      id: 0
    }]
}

const FINANCIAMENTO: Financiamento =
{
  valorTotal: 23,
  lote: new Lote,
  cliente: CLIENTE,
  dataCompra: '12/11/2024',
  qtdeParcelas: 200,
  parcelasPagas: 200,
  parcelasRestantes: 180,
  totalPago: 9520,
  faltaPagar: 12050,
  valorParcela: 0,
  id: 0
}

const LOTES: Lote[] = [
  {
    valor: 2,
    financiamento: FINANCIAMENTO,
    numero: 10,
    loteamento: LOTEAMENTO,
    cliente: CLIENTE,
    id: 0
  }
];

@Component({
  selector: 'app-cliente-lotes',
  templateUrl: './cliente-lotes.component.html',
  styleUrls: ['./cliente-lotes.component.css'],
  imports: [DecimalPipe, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule, NgbHighlight, CommonModule, NgFor, NgxMaskDirective, RouterLink],
  standalone: true,
  providers: [DecimalPipe],
})
export class ClienteLotesComponent implements OnInit {

  lotes$!: Observable<Lote[]>;
  financiamentos$!: Observable<Financiamento[]>;
  filter = new FormControl('', { nonNullable: true });
  financiamento = new Financiamento();
  list: Lote[] = LOTES;
  listFinanciamentos: Financiamento[] = [];
  cliente: Cliente = new Cliente;

  constructor(pipe: DecimalPipe, private clienteService: ClienteService, private financiamentoService: FinanciamentoService, formBuilder: FormBuilder, private _route: ActivatedRoute) {

    this.lotes$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    );

    this._route.params.subscribe((params) => {
      var recordName = params["cpf"];
      //load record data
    });

    let cpf = this._route.snapshot.paramMap.get('cpf');
   
    if(cpf != null) {
      this.clienteService.buscarClientePorCpf(cpf)
        .subscribe(data => { 
          this.cliente = data;
      },
      error => {
         console.log(error);
      });
    } 

    this.financiamentoService.listarFinanciamentosPorCpf(cpf)
    .subscribe((res: any) => {
      this.listFinanciamentos = res;
      console.log("list", this.listFinanciamentos);

      this.financiamentos$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.searchFinanciamentos(text, pipe)),
      );

    });

   


    // this.clienteService.listarClientes()
    //   .subscribe((products) => {
    //     this.list = products;
    //     this.clientes$ = this.filter.valueChanges.pipe(
    //       startWith(''),
    //       map((text) => this.search(text, pipe)),
    //     );

    //   });



  }
  ngOnInit(): void {

   


    //console.log("cpf", cpf);

   

  }

  search(text: string, pipe: PipeTransform): Lote[] {

    return LOTES.filter((resp: any) => {
      const term = text.toLowerCase();
      return (
        pipe.transform(resp.numero).includes(term)
      );
    });
  }

  searchFinanciamentos(text: string, pipe: PipeTransform): Financiamento[] {
    return this.listFinanciamentos.filter((resp: any) => {
      const term = text.toLowerCase();
      return (
        pipe.transform(resp.id).includes(term)
      );
    });
  }

}
