import { Injectable } from '@angular/core';
import { Loteamento } from '../model/loteamento-model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteamentoService {
  
  url =  environment.BASE_URL + "api/loteamentos";
  private loteamentos$!: Observable<Loteamento[]>;

  constructor(private http: HttpClient) { }

  listarLoteamentos(): Observable<Loteamento[]> {
      return this.http.get<Loteamento[]>(`${this.url}`);
    }

  salvarLoteamento(loteamento: Loteamento) {
    return this.http.post(this.url, loteamento);
  }
}
