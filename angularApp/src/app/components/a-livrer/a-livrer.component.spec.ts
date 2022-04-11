import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ALivrerComponent } from './a-livrer.component';

describe('ALivrerComponent', () => {
  let component: ALivrerComponent;
  let fixture: ComponentFixture<ALivrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ALivrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ALivrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
