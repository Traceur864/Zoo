import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParquesComponent } from './parques.component';

describe('ParquesComponent', () => {
  let component: ParquesComponent;
  let fixture: ComponentFixture<ParquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParquesComponent]
    });
    fixture = TestBed.createComponent(ParquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
