import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigueDetailComponent } from './ligue-detail.component';

describe('LigueDetailComponent', () => {
  let component: LigueDetailComponent;
  let fixture: ComponentFixture<LigueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigueDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
