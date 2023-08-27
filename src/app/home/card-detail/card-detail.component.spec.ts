import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailDialogComponent } from './card-detail.component';

describe('CardDetailDialogComponent', () => {
  let component: CardDetailDialogComponent;
  let fixture: ComponentFixture<CardDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailDialogComponent]
    });
    fixture = TestBed.createComponent(CardDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
