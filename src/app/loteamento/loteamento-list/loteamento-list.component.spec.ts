import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteamentoListComponent } from './loteamento-list.component';

describe('LoteamentoListComponent', () => {
  let component: LoteamentoListComponent;
  let fixture: ComponentFixture<LoteamentoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoteamentoListComponent]
    });
    fixture = TestBed.createComponent(LoteamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
