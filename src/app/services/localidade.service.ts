import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../model/estado-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadeService {

  url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.url}`);
  }

  listarCidades(uf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${uf}/municipios`);
  }
}
