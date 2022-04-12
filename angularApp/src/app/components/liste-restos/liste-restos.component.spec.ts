import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRestosComponent } from './liste-restos.component';

describe('ListeRestosComponent', () => {
  let component: ListeRestosComponent;
  let fixture: ComponentFixture<ListeRestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
