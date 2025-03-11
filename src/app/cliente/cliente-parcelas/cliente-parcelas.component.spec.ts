import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteParcelasComponent } from './cliente-parcelas.component';

describe('ClienteParcelasComponent', () => {
  let component: ClienteParcelasComponent;
  let fixture: ComponentFixture<ClienteParcelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteParcelasComponent]
    });
    fixture = TestBed.createComponent(ClienteParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
