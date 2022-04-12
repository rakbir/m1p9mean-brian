import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionRestaurantComponent } from './inscription-restaurant.component';

describe('InscriptionRestaurantComponent', () => {
  let component: InscriptionRestaurantComponent;
  let fixture: ComponentFixture<InscriptionRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
