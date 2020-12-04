import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribeMedicationModalComponent } from './prescribe-medication-modal.component';

describe('PrescribeMedicationModalComponent', () => {
  let component: PrescribeMedicationModalComponent;
  let fixture: ComponentFixture<PrescribeMedicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescribeMedicationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescribeMedicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
