import { DecimalPipe, AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbTypeaheadModule, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import { map, Observable, startWith } from 'rxjs';
import { Cliente } from 'src/app/model/cliente-model';
import { Financiamento } from 'src/app/model/financiamento-model';
import { Lote } from 'src/app/model/lote-model';
import { Loteamento } from 'src/app/model/loteamento-model';
import { Parcela } from 'src/app/model/parcela-model';
import { ClienteService } from 'src/app/services/cliente.service';





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
};

const FINANCIAMENTO: Financiamento =
{
  valorTotal: 23,
  lote: {
    valor: 20000,

    numero: 10,
    loteamento: LOTEAMENTO,
    cliente: CLIENTE,
    id: 0,
    financiamento: new Financiamento
  },
  cliente: CLIENTE,
  dataCompra: '12/11/2024',
  qtdeParcelas: 200,
  parcelasPagas: 200,
  parcelasRestantes: 180,
  totalPago: 9520,
  faltaPagar: 12050,
  valorParcela: 500,
  id: 0
};

const LOTE: Lote =
{
  valor: 20000,
  financiamento: FINANCIAMENTO,
  numero: 10,
  loteamento: LOTEAMENTO,
  cliente: CLIENTE,
  id: 0
};

const PARCELAS: Parcela[] = [{
  numeroParcela: 1,
  id: 1,
  lote: LOTE,
  cliente: CLIENTE,
  financiamento: FINANCIAMENTO,
  dataPagamento: new Date('12/11/2024'),
  valor: 500,
  status: 'PAGO'
},
{
  numeroParcela: 2,
  id: 2,
  lote: LOTE,
  cliente: CLIENTE,
  financiamento: FINANCIAMENTO,
  dataPagamento: new Date('12/12/2024'),
  valor: 500,
  status: 'PAGO'
}];

@Component({
  selector: 'app-cliente-parcelas',
  templateUrl: './cliente-parcelas.component.html',
  styleUrls: ['./cliente-parcelas.component.css'],
  imports: [DecimalPipe, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule, NgbHighlight, CommonModule, NgFor, NgxMaskDirective, RouterLink],
  standalone: true,
  providers: [DecimalPipe],
})
export class ClienteParcelasComponent implements OnInit {

  parcelas$!: Observable<Parcela[]>;
  filter = new FormControl('', { nonNullable: true });
  financiamento = new Financiamento();
  list: Parcela[] = PARCELAS;
  cliente: Cliente = new Cliente;

  constructor(pipe: DecimalPipe, private clienteService: ClienteService, formBuilder: FormBuilder, private _route: ActivatedRoute) {
    this.parcelas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    );

    this.financiamento = FINANCIAMENTO;
    
  }
  ngOnInit(): void {

  }

  search(text: string, pipe: PipeTransform): Parcela[] {
    return PARCELAS.filter((resp: any) => {
      const term = text.toLowerCase();
      return (
        pipe.transform(resp.numeroParcela).includes(term)
      );
    });
  }

}
