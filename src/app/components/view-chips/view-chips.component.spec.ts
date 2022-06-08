import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChipsComponent } from './view-chips.component';

describe('ViewChipsComponent', () => {
  let component: ViewChipsComponent;
  let fixture: ComponentFixture<ViewChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
