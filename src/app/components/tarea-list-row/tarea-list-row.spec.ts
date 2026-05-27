import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaListRow } from './tarea-list-row';

describe('TareaListRow', () => {
  let component: TareaListRow;
  let fixture: ComponentFixture<TareaListRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaListRow],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaListRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
