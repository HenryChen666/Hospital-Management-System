import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionListModalComponent } from './prescription-list-modal.component';

describe('PrescriptionListModalComponent', () => {
  let component: PrescriptionListModalComponent;
  let fixture: ComponentFixture<PrescriptionListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
