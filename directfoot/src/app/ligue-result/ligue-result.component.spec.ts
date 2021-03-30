import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigueResultComponent } from './ligue-result.component';

describe('LigueResultComponent', () => {
  let component: LigueResultComponent;
  let fixture: ComponentFixture<LigueResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigueResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigueResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
