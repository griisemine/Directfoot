import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigueAccueilComponent } from './ligue-accueil.component';

describe('LigueAccueilComponent', () => {
  let component: LigueAccueilComponent;
  let fixture: ComponentFixture<LigueAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigueAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigueAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
