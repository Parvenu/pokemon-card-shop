import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReduxStoreModule } from 'src/app/redux-store/redux-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { Card, FOIL } from '../shared/models/card.model';
import { FoilCount } from '../shared/models/shopping-cart.model';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let store: MockStore;

  const cards = [
    {
      id: 'a',
      images: {},
      tcgplayer: {
        prices: {
          [FOIL.normal]: { low: 10 },
          [FOIL.holofoil]: { low: 100 },
        },
      },
    },
    {
      id: 'b',
      images: {},
      tcgplayer: {
        prices: {
          [FOIL.normal]: { low: 50 },
          [FOIL.holofoil]: { low: 500 },
        },
      },
    },
  ] as Card[];

  const shoppingCartState = {
    shoppingCart: {
      items: [
        {
          foilCount: {
            [FOIL.normal]: 1,
            [FOIL.holofoil]: 2,
          } as FoilCount,
          card: cards[0],
        },
        {
          foilCount: {
            [FOIL.normal]: 3,
            [FOIL.holofoil]: 1,
          } as FoilCount,
          card: cards[1],
        },
      ],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      imports: [CommonModule, SharedModule, CoreModule, ReduxStoreModule, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState: shoppingCartState })],
    });
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should count total price of the shopping cart', () => {
    component.shoppingCartTotalPrice$.subscribe((res) => {
      expect(res).toBe('860.00');
    });
  });

  describe('countItemTotalPrice', () => {
    it('should count total price of an item', () => {
      expect(component.countItemTotalPrice(shoppingCartState.shoppingCart.items[0])).toBe('210.00');
      expect(component.countItemTotalPrice(shoppingCartState.shoppingCart.items[1])).toBe('650.00');
    });
  });
});
