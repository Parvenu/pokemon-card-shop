import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CartItem, FoilCount, ShoppingCart } from '../shared/models/shopping-cart.model';
import { shoppingCartState } from '../redux-store/selectors/shopping-cart.selector';
import { Card, FOIL } from '../shared/models/card.model';
import { ShoppingCartAction } from '../redux-store/actions/shopping-cart.action';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$!: Observable<ShoppingCart>;
  public shoppingCartTotalPrice$!: Observable<string>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.shoppingCart$ = this.store.select(shoppingCartState);
    this.shoppingCartTotalPrice$ = this.shoppingCart$.pipe(
      map((sc) =>
        sc.items
          .reduce((acc, curr) => {
            return acc + parseFloat(this.countItemTotalPrice(curr));
          }, 0)
          .toFixed(2),
      ),
    );
  }

  public getItemFoils(foilCount: FoilCount): FOIL[] {
    return [...foilCount.keys()];
  }

  public countItemTotalPrice(item: CartItem, foil?: FOIL): string {
    return (foil ? [foil] : this.getItemFoils(item.foilCount))
      .reduce((acc, foil) => {
        return (acc += (item.foilCount.get(foil) ?? 0) * item.card.tcgplayer.prices[foil]!.low);
      }, 0)
      .toFixed(2);
  }
  public add(card: Card, foil: keyof typeof FOIL) {
    this.store.dispatch(ShoppingCartAction.addCard({ card, foil: FOIL[foil] }));
  }

  public remove(card: Card, foil: keyof typeof FOIL) {
    this.store.dispatch(ShoppingCartAction.removeCard({ card, foil: FOIL[foil] }));
  }
}
