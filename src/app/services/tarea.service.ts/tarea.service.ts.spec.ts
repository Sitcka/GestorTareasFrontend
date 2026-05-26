import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaServiceTs } from './tarea.service.ts';

describe('TareaServiceTs', () => {
  let component: TareaServiceTs;
  let fixture: ComponentFixture<TareaServiceTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaServiceTs],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaServiceTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
