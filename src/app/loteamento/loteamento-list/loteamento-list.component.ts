import { AsyncPipe, CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Observable, startWith, map } from 'rxjs';
import { Loteamento } from 'src/app/model/loteamento-model';
import { LoteamentoService } from 'src/app/services/loteamento.service';

@Component({
  selector: 'app-loteamento-list',
  templateUrl: './loteamento-list.component.html',
  styleUrls: ['./loteamento-list.component.css'],
  imports: [DecimalPipe, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule, NgbHighlight, CommonModule, NgFor],
  providers: [DecimalPipe],
  standalone: true
})
export class LoteamentoListComponent implements OnInit {

  loteamentos$!: Observable<Loteamento[]>;

  filter = new FormControl('', { nonNullable: true });

  list: Loteamento[] = [];

  constructor(pipe: DecimalPipe, private loteamentoService: LoteamentoService, formBuilder: FormBuilder) {


    this.loteamentoService.listarLoteamentos()
      .subscribe((products) => {
        this.list = products;
        this.loteamentos$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text, pipe)),
        );

      });

  } 
  
  ngOnInit(): void {

  }

  search(text: string, pipe: PipeTransform): Loteamento[] {  
      return this.list.filter((resp: any) => {
        const term = text.toLowerCase();
        return (
          resp.nome.toLowerCase().includes(term)
        );
      });
    }

}