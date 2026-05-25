import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTareaModal } from './add-tarea-modal';

describe('AddTareaModal', () => {
  let component: AddTareaModal;
  let fixture: ComponentFixture<AddTareaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTareaModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTareaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
