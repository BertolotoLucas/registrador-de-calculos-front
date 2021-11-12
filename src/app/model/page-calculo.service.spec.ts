import { TestBed } from '@angular/core/testing';

import { PageCalculoService } from './page-calculo.service';

describe('PageCalculoService', () => {
  let service: PageCalculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageCalculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
