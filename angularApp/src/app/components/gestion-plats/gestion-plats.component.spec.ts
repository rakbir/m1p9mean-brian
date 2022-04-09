import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlatsComponent } from './gestion-plats.component';

describe('GestionPlatsComponent', () => {
  let component: GestionPlatsComponent;
  let fixture: ComponentFixture<GestionPlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPlatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
