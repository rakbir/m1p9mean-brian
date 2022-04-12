import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLivreursComponent } from './liste-livreurs.component';

describe('ListeLivreursComponent', () => {
  let component: ListeLivreursComponent;
  let fixture: ComponentFixture<ListeLivreursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeLivreursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLivreursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
