import { TestBed } from '@angular/core/testing';

import { FormDbService } from './form-db.service';

describe('FormDbService', () => {
  let service: FormDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
