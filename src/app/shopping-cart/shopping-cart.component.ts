import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CartItem, FoilCount, ShoppingCart } from '../shared/models/shopping-cart.model';
import { shoppingCartState } from '../redux-store/selectors/shopping-cart.selector';
import { Card, FOIL } from '../shared/models/card.model';
import { ShoppingCartAction } from '../redux-store/actions/shopping-cart.action';
import { CardService } from '../core/services/card.service';
import { CountItemPricePipe } from '../core/pipes/count-item-price/count-item-price';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$!: Observable<ShoppingCart>;
  public shoppingCartTotalPrice$!: Observable<string>;
  public isLoading$ = this.cardsService.isLoading$;
  constructor(
    private readonly store: Store,
    private readonly cardsService: CardService,
    private readonly countItemPrice: CountItemPricePipe,
  ) {}
  ngOnInit(): void {
    this.shoppingCart$ = this.store.select(shoppingCartState);
    this.shoppingCartTotalPrice$ = this.shoppingCart$.pipe(
      map((sc) =>
        sc.items
          .reduce((acc, curr) => {
            return acc + parseFloat(this.countItemPrice.transform(curr));
          }, 0)
          .toFixed(2),
      ),
    );
  }

  public getItemFoils(foilCount: FoilCount): FOIL[] {
    return [...foilCount.keys()];
  }

  public add(card: Card, foil: keyof typeof FOIL) {
    this.store.dispatch(ShoppingCartAction.addCard({ card, foil: FOIL[foil] }));
  }

  public remove(card: Card, foil: keyof typeof FOIL) {
    this.store.dispatch(ShoppingCartAction.removeCard({ card, foil: FOIL[foil] }));
  }
}
