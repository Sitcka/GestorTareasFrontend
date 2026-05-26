import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServiceTs } from './auth.service.ts';

describe('AuthServiceTs', () => {
  let component: AuthServiceTs;
  let fixture: ComponentFixture<AuthServiceTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthServiceTs],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthServiceTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
