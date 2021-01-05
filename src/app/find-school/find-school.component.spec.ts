import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSchoolComponent } from './find-school.component';

describe('FindSchoolComponent', () => {
  let component: FindSchoolComponent;
  let fixture: ComponentFixture<FindSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
