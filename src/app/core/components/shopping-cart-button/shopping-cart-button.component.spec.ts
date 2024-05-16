import { ShoppingCartButtonComponent } from './shopping-cart-button.component';
import { FoilCount } from '../../../shared/models/shopping-cart.model';
import { Card, FOIL } from 'src/app/shared/models/card.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ShoppingCartButtonComponent', () => {
  let component: ShoppingCartButtonComponent;
  let fixture: ComponentFixture<ShoppingCartButtonComponent>;
  let store: MockStore;

  const initialState = {
    shoppingCart: {
      items: [
        {
          foilCount: {
            [FOIL.normal]: 1,
            [FOIL.holofoil]: 2,
          } as FoilCount,
          card: {
            id: 'a',
            tcgplayer: {
              prices: {
                [FOIL.normal]: { low: 10 },
                [FOIL.holofoil]: { low: 100 },
              },
            },
          } as unknown as Card,
        },
        {
          foilCount: {
            [FOIL.normal]: 3,
            [FOIL.holofoil]: 1,
          } as FoilCount,
          card: {
            id: 'b',
            tcgplayer: {
              prices: {
                [FOIL.normal]: { low: 50 },
                [FOIL.holofoil]: { low: 500 },
              },
            },
          } as unknown as Card,
        },
      ],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartButtonComponent],
      imports: [CommonModule, SharedModule],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ShoppingCartButtonComponent);
    component = fixture.componentInstance;
  });

  it('should compute the number of cart items', () => {
    component.ngOnInit();
    component.shoppingCartItemsCount$.subscribe((cardCount) => expect(cardCount).toBe(7));
  });
});
