import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteListComponent } from './lote-list.component';

describe('LoteListComponent', () => {
  let component: LoteListComponent;
  let fixture: ComponentFixture<LoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoteListComponent]
    });
    fixture = TestBed.createComponent(LoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
