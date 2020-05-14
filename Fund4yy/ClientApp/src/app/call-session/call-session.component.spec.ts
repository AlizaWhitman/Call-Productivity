import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallSessionComponent } from './call-session.component';

describe('CallSessionComponent', () => {
  let component: CallSessionComponent;
  let fixture: ComponentFixture<CallSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
