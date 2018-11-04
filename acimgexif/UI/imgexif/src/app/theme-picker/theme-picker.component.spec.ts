import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePicker } from './theme-picker.component';

describe('ThemePicker', () => {
  let component: ThemePicker;
  let fixture: ComponentFixture<ThemePicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemePicker ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
