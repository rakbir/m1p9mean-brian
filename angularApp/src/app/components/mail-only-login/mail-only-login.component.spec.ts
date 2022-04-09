import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailOnlyLoginComponent } from './mail-only-login.component';

describe('MailOnlyLoginComponent', () => {
  let component: MailOnlyLoginComponent;
  let fixture: ComponentFixture<MailOnlyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailOnlyLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailOnlyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
