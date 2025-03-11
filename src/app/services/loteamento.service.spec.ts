import { TestBed } from '@angular/core/testing';

import { LoteamentoService } from './loteamento.service';

describe('LoteamentoService', () => {
  let service: LoteamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoteamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
