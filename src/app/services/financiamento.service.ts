import { Injectable } from '@angular/core';
import { Financiamento } from '../model/financiamento-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanciamentoService {
  url = environment.BASE_URL + "api/financiamento";
  private financiamentos$!: Observable<Financiamento[]>;

  constructor(private http: HttpClient) { }

  listarFinanciamentosPorCpf(cpf: string | null) {
    return this.http.get<Financiamento[]>(`${this.url}/${cpf}`);
  }


  listarFinanciamentosPorId(id: string | null) {
    return this.http.get<Financiamento>(`${this.url}/id/${id}`);
  }

  salvarCliente(financiamento: Financiamento) {
    return this.http.post(this.url, financiamento);
  }

}
