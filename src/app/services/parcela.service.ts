import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Financiamento } from '../model/financiamento-model';
import { Parcela } from '../model/parcela-model';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {

  url = environment.BASE_URL + "/parcelas";
  private parcelas$!: Observable<Parcela[]>;

  constructor(private http: HttpClient) { }

  listarParcelasPorCpfAndIdFinanciamento(cpf: string | null, id: string | null) {
    return this.http.get<Parcela[]>(`${this.url}/${cpf}/${id}`);
  }

  salvarParcela(parcela: Parcela) {
    console.log("url", `${this.url}/${parcela.id}`);
      return this.http.put(`${this.url}/${parcela.id}`, parcela);
    }

}
