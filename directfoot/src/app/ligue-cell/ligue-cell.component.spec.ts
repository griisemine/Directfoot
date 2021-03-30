import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigueCellComponent } from './ligue-cell.component';

describe('LigueCellComponent', () => {
  let component: LigueCellComponent;
  let fixture: ComponentFixture<LigueCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigueCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigueCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
