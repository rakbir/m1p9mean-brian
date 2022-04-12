import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRestaurantsComponent } from './gestion-restaurants.component';

describe('GestionRestaurantsComponent', () => {
  let component: GestionRestaurantsComponent;
  let fixture: ComponentFixture<GestionRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRestaurantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
