import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciamentoFormComponent } from './financiamento-form.component';

describe('FinanciamentoFormComponent', () => {
  let component: FinanciamentoFormComponent;
  let fixture: ComponentFixture<FinanciamentoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanciamentoFormComponent]
    });
    fixture = TestBed.createComponent(FinanciamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
