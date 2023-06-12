import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserFeedbackComponent } from './card-user-feedback.component';

describe('CardUserFeedbackComponent', () => {
  let component: CardUserFeedbackComponent;
  let fixture: ComponentFixture<CardUserFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUserFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUserFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
