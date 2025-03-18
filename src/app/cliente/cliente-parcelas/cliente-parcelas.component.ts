import { DecimalPipe, AsyncPipe, CommonModule, NgFor, formatDate } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbTypeaheadModule, NgbHighlight, NgbDatepickerModule, NgbDateStruct, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import { map, Observable, startWith } from 'rxjs';
import { Cliente } from 'src/app/model/cliente-model';
import { Financiamento } from 'src/app/model/financiamento-model';
import { Lote } from 'src/app/model/lote-model';
import { Loteamento } from 'src/app/model/loteamento-model';
import { Parcela } from 'src/app/model/parcela-model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FinanciamentoService } from 'src/app/services/financiamento.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { ParcelaService } from 'src/app/services/parcela.service';


@Component({
  selector: 'app-cliente-parcelas',
  templateUrl: './cliente-parcelas.component.html',
  styleUrls: ['./cliente-parcelas.component.css'],
  imports: [DecimalPipe, AsyncPipe, ReactiveFormsModule, NgbHighlight, CommonModule, NgFor,
    NgxMaskDirective, RouterLink, FormsModule, ModalComponent, NgbDatepickerModule,
    NgbPaginationModule
  ],
  standalone: true,
  providers: [DecimalPipe],
})
export class ClienteParcelasComponent implements OnInit {

  // parcelas$!: Observable<Parcela[]>;
  filter = new FormControl('', { nonNullable: true });
  parcelas: Parcela[] = [];
  financiamento: Financiamento = new Financiamento;
  cliente: Cliente = new Cliente;

  parcelaSelecionada: Parcela = new Parcela;
  dataCompra!: NgbDateStruct;
  valorPago!: number;
  cpf!: any;
  id!: any;
  msgError!: string;
  showError = false;

  page = 1;
  pageSize = 10;
  collectionSize = this.parcelas.length;

  constructor(pipe: DecimalPipe,
    private clienteService: ClienteService,
    private financiamentoService: FinanciamentoService,
    private parcelaService: ParcelaService,
    protected modalService: ModalService,
    private _route: ActivatedRoute) {

    this.financiamento.cliente = new Cliente;
    this.cpf = this._route.snapshot.paramMap.get('cpf');
    if(this.cpf != null) {
      this.clienteService.buscarClientePorCpf(this.cpf)
        .subscribe(data => { 
          this.cliente = data;
      },
      error => {
         console.log(error);
      });
    } 

    this.id = this._route.snapshot.paramMap.get('id');

    this.financiamentoService.listarFinanciamentosPorId(this.id)
      .subscribe((res: any) => {
        this.financiamento = res;
      });
    this.refreshParcelas();

  }
  ngOnInit(): void {

  }


  onSelectParcela(parcela: Parcela) {
    this.parcelaSelecionada = parcela;
    this.valorPago = parcela.valor;
    this.modalService.open('modal-1', parcela);
  }

  onDateSelect(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    let finalDate = year + "-" + month + "-" + day;
    this.parcelaSelecionada.dataPagamento = finalDate;

    this.validaDatas();
  }
  
  private validaDatas() {
    let date1 = formatDate(this.parcelaSelecionada.dataVencimento, 'yyyy-MM-dd', 'pt_BR');
    let date2 = formatDate(this.parcelaSelecionada.dataPagamento, 'yyyy-MM-dd', 'pt_BR');
    if (date2 < date1) {
      this.showError = true;
      this.msgError = `Data de Pagamento ${formatDate(date2, 'dd-MM-yyyy', 'pt_BR')} não pode ser anterior a Data de Vencimento! ${formatDate(date1, 'dd-MM-yyyy', 'pt_BR')} `;
      console.log("parcelaSelecionada", this.parcelaSelecionada);
    } else {
      this.showError = false;
      this.msgError = "";
    }
  }

  atualizarParcela(event: any) {
    if (this.valorPago < this.parcelaSelecionada.valor) {
      this.showError = true
      this.msgError = `Valor pago não pode ser menor que o valor da Parcela ${this.parcelaSelecionada.valor}`;
    } else {
      this.parcelaSelecionada.status = "PAGO";
      this.parcelaSelecionada.cliente = this.cliente;
      this.parcelaSelecionada.financiamento = this.financiamento;
      this.parcelaSelecionada.lote = this.financiamento.lote;
      this.parcelaSelecionada.valor = this.valorPago;
      
     // this.parcelaService.salvarParcela(this.parcelaSelecionada).subscribe(resp => {
     //   console.log("parcela paga", this.parcelaSelecionada);
     // });
      this.parcelaSelecionada = new Parcela;
      this.modalService.close();    
      

      this.financiamento.faltaPagar = this.financiamento.faltaPagar - this.valorPago;
      this.financiamento.parcelasPagas = this.financiamento.parcelasPagas + 1;
      this.financiamento.parcelasRestantes = this.financiamento.parcelasRestantes -1;
      this.financiamento.totalPago = this.financiamento.totalPago + this.valorPago;
    }

  }

  refreshParcelas() {
    this.parcelaService.listarParcelasPorCpfAndIdFinanciamento(this.cpf, this.id)
      .subscribe((res: any) => {
        this.parcelas = res;
        this.collectionSize = this.parcelas.length;
        this.parcelas = this.parcelas.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );
      });

  }

}
