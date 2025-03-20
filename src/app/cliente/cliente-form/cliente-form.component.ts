import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente-model';
import { CommonModule, NgClass } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { Endereco } from '../../model/endereco-model';
import { Estado } from 'src/app/model/estado-model';
import { LocalidadeService } from 'src/app/services/localidade.service';
import { Router } from '@angular/router';
import { FieldErrorDisplayComponent } from 'src/app/field-error-display/field-error-display.component';

@Component({
  selector: 'app-cliente-form',
  imports: [FormsModule, CommonModule, NgxMaskDirective, FieldErrorDisplayComponent],
  templateUrl: './cliente-form.component.html',
  standalone: true
})
export class ClienteFormComponent implements OnInit {
  // userForm!: FormGroup;
  isEdit = false;
  cliente = new Cliente;
  endereco = new Endereco;
  estados: Estado[] = [];
  cidades: any[] = [];
  estadoSelecionado!: string;
  cidadeSelecionada!: string;

  constructor(private clienteService: ClienteService, private localidadeService: LocalidadeService, private router: Router) {

  }

  ngOnInit(): void {
    this.listarEstados();
    this.estadoSelecionado = 'AM';
    this.listarCidades(this.estadoSelecionado);
  }

  salvarCliente() {
    this.cliente.endereco = this.endereco;
    console.log(this.cliente);
    this.clienteService.salvarCliente(this.cliente).subscribe(resp => {
      this.router.navigate(['/clientes']);
    });
  }

  listarEstados() {
    this.localidadeService.listarEstados().subscribe(resp => {
      this.estados = resp;
    })
  }

  listarCidades(uf: string) {
    this.localidadeService.listarCidades(uf).subscribe(resp => {
      this.cidades = resp;
    })
  }


  isFieldValid(field: string) {
    return '';// !this.userForm.get(field)?.valid && this.userForm.get(field)?.touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onChangeEstado(estado: string) {
    this.estadoSelecionado = estado;
    this.listarCidades(this.estadoSelecionado);
  }

  onChangeCidade(cidade: string) {
    this.cidadeSelecionada = cidade;
    this.endereco.cidade = this.cidadeSelecionada;
  }

}
