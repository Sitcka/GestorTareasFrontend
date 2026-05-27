import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaModelTs } from './tarea.model.js';

describe('TareaModelTs', () => {
  let component: TareaModelTs;
  let fixture: ComponentFixture<TareaModelTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaModelTs],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaModelTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
