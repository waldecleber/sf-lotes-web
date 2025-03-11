import { Component, OnInit, PipeTransform } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbHighlight, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente-model';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-cliente-list',
  imports: [DecimalPipe, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule, NgbHighlight, CommonModule, NgFor, RouterLink],
  templateUrl: './cliente-list.component.html',
  standalone: true,
  providers: [DecimalPipe],
})
export class ClienteListComponent implements OnInit {
  clientes$!: Observable<Cliente[]>;

  filter = new FormControl('', { nonNullable: true });

  list: Cliente[] = [];

  constructor(pipe: DecimalPipe, private clienteService: ClienteService, formBuilder: FormBuilder, private _route: ActivatedRoute) {



    this.clienteService.listarClientes()
      .subscribe((products) => {
        this.list = products;
        this.clientes$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text, pipe)),
        );

      });



  }
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      var recordName = params["name"];
      console.log("param", recordName);
      //load record data
    });
  }



  search(text: string, pipe: PipeTransform): Cliente[] {

    return this.list.filter((resp: any) => {
      const term = text.toLowerCase();
      return (
        resp.nome.toLowerCase().includes(term)
      );
    });
  }
}
