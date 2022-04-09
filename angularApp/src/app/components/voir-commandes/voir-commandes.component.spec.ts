import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirCommandesComponent } from './voir-commandes.component';

describe('VoirCommandesComponent', () => {
  let component: VoirCommandesComponent;
  let fixture: ComponentFixture<VoirCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirCommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
