import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteService } from './services/cliente.service';
import { NgbDatepickerModule, NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { LocalidadeService } from './services/localidade.service';
import { LoteamentoListComponent } from './loteamento/loteamento-list/loteamento-list.component';
import { LoteamentoFormComponent } from './loteamento/loteamento-form/loteamento-form.component';
import { LoteFormComponent } from './lote/lote-form/lote-form.component';
import { LoteListComponent } from './lote/lote-list/lote-list.component';
import { FormsModule } from '@angular/forms';
import { LoteamentoService } from './services/loteamento.service';
import { ClienteLotesComponent } from './cliente/cliente-lotes/cliente-lotes.component';
import { ClienteParcelasComponent } from './cliente/cliente-parcelas/cliente-parcelas.component';
import { FinanciamentoFormComponent } from './financiamento/financiamento-form/financiamento-form.component';
import { FinanciamentoService } from './services/financiamento.service';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoteamentoFormComponent,
    LoteFormComponent,
    LoteListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule, NgxMaskDirective,
    NgbTypeaheadModule, CommonModule,
    FormsModule,
    NgbDatepickerModule
  ],
  providers: [ClienteService, LocalidadeService, LoteamentoService, FinanciamentoService, provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt' }, 
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
