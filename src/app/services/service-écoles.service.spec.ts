import { TestBed } from '@angular/core/testing';

import { ServiceÉcolesService } from './service-écoles.service';

describe('ServiceÉcolesService', () => {
  let service: ServiceÉcolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceÉcolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
