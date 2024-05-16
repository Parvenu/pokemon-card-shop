import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardListItemComponent } from './card-list-item.component';
import { Card, Tcgplayer } from 'src/app/shared/models/card.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CardListItemComponent', () => {
  let component: CardListItemComponent;
  let fixture: ComponentFixture<CardListItemComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardListItemComponent],
      imports: [CommonModule, SharedModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(CardListItemComponent);
    component = fixture.componentInstance;
  });

  it('should find lowest price', () => {
    component.ngOnInit();
    component.card = {
      id: 'a',
      images: {},
      tcgplayer: {
        prices: {
          normal: { low: 1, mid: 2, high: 3, market: 2, directLow: 2 },
          holofoil: { low: 2, mid: 3, high: 4, market: 3, directLow: 3 },
        },
      } as Tcgplayer,
    } as Card;
    fixture.detectChanges();
    expect(component.lowestPrice).toBe(1);
  });
});
