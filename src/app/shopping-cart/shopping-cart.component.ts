import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, take, tap } from 'rxjs';
import { CartItem, FoilCount, ShoppingCart } from '../shared/models/shopping-cart.model';
import { shoppingCartState } from '../redux-store/selectors/shopping-cart.selector';
import { Card, FOIL } from '../shared/models/card.model';
import { ShoppingCartAction } from '../redux-store/actions/shopping-cart.action';
import { CardService } from '../core/services/card.service';
import { CountItemPricePipe } from '../core/pipes/count-item-price/count-item-price';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$!: Observable<ShoppingCart>;
  public shoppingCartTotalPrice$!: Observable<string>;
  public isLoading$ = this.cardsService.isLoading$;
  public cartItemForm!: FormGroup;
  public cartFormControls = new Map<string, FormControl>();
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
    this.shoppingCart$
      .pipe(
        map((sc) => this.initForm(sc)),
        take(1),
      )
      .subscribe((fg) => (this.cartItemForm = fg));
  }

  public initForm(shoppingCartState: ShoppingCart): FormGroup {
    let fg = new FormGroup({});
    shoppingCartState.items.map((i) => {
      i.foilCount.forEach((v, k) => {
        const controlName = `${i.card.name}-${k}`;
        const control = new FormControl<number>(v);
        this.cartFormControls.set(controlName, control);
        fg.addControl(controlName, control);
        control.valueChanges.subscribe((newCount) =>
          this.store.dispatch(ShoppingCartAction.changeItemCount({ card: i.card, foil: k, newCount: newCount ?? 0 })),
        );
      });
    });

    return fg;
  }

  public getItemFoils(foilCount: FoilCount): FOIL[] {
    return [...foilCount.keys()];
  }

  public remove(card: Card, foil: keyof typeof FOIL) {
    this.store.dispatch(ShoppingCartAction.deleteItem({ card, foil: FOIL[foil] }));
  }
}
