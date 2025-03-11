import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteLotesComponent } from './cliente-lotes.component';

describe('ClienteLotesComponent', () => {
  let component: ClienteLotesComponent;
  let fixture: ComponentFixture<ClienteLotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteLotesComponent]
    });
    fixture = TestBed.createComponent(ClienteLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
