import { TestBed } from '@angular/core/testing';

import { TareaServiceTs } from './tarea.service.js';

describe('TareaServiceTs', () => {
  let service: TareaServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
