import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmailComponent } from './main-email.component';

describe('MainEmailComponent', () => {
  let component: MainEmailComponent;
  let fixture: ComponentFixture<MainEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainEmailComponent]
    });
    fixture = TestBed.createComponent(MainEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
