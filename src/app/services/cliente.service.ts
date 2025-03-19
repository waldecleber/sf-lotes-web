import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente-model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url =  environment.BASE_URL + "api/clientes";
  private clientes$!: Observable<Cliente[]>;

  constructor(private http: HttpClient) { }
  


getClientes(): Observable<Cliente[]> {
  this.clientes$ = this.http.get<Cliente[]>(this.url);
  return this.clientes$;
}

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}`);
  }

  buscarClientePorCpf(cpf: string) {
    return this.http.get<Cliente>(`${this.url}/${cpf}`);
  }

  salvarCliente(cliente: Cliente) {
    return this.http.post(this.url, cliente);
  }
}
