import { TestBed } from '@angular/core/testing';

import { FinanciamentoService } from './financiamento.service';

describe('FinanciamentoService', () => {
  let service: FinanciamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanciamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
