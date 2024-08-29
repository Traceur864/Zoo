import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEmailComponent } from './guardar-email.component';

describe('GuardarEmailComponent', () => {
  let component: GuardarEmailComponent;
  let fixture: ComponentFixture<GuardarEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuardarEmailComponent]
    });
    fixture = TestBed.createComponent(GuardarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
