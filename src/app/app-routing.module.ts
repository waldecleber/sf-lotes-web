import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteService } from './services/cliente.service';
import { LoteFormComponent } from './lote/lote-form/lote-form.component';
import { LoteListComponent } from './lote/lote-list/lote-list.component';
import { LoteamentoFormComponent } from './loteamento/loteamento-form/loteamento-form.component';
import { LoteamentoListComponent } from './loteamento/loteamento-list/loteamento-list.component';
import { ClienteLotesComponent } from './cliente/cliente-lotes/cliente-lotes.component';
import { ClienteParcelasComponent } from './cliente/cliente-parcelas/cliente-parcelas.component';
import { FinanciamentoFormComponent } from './financiamento/financiamento-form/financiamento-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  { path: 'dashboard', component: DashboardComponent },

  { path: 'clientes', component: ClienteListComponent },

  { path: 'cliente-form', component: ClienteFormComponent },

  { path: 'cliente-lotes/:cpf', component: ClienteLotesComponent },

  { path: 'cliente-parcelas/:cpf/:id', component: ClienteParcelasComponent },

  { path: 'lotes', component: LoteListComponent },

  { path: 'lote-form', component: LoteFormComponent },

  { path: 'loteamento-form', component: LoteamentoFormComponent },

  { path: 'loteamentos', component: LoteamentoListComponent },

  { path: 'financiamento-form/:cpf', component: FinanciamentoFormComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ClienteService]
})
export class AppRoutingModule { 

}
