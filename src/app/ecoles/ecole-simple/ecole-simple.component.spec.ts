import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleSimpleComponent } from './ecole-simple.component';

describe('EcoleSimpleComponent', () => {
  let component: EcoleSimpleComponent;
  let fixture: ComponentFixture<EcoleSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoleSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
