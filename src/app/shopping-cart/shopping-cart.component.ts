import { Component, EventEmitter, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, concatWith, map, take, takeUntil, tap, withLatestFrom, zip } from 'rxjs';
import { CartItem, ShoppingCart } from '../shared/models/shopping-cart.model';
import { shoppingCartState } from '../redux-store/selectors/shopping-cart.selector';
import { Card, FOIL } from '../shared/models/card.model';
import { ShoppingCartAction } from '../redux-store/actions/shopping-cart.action';
import { CardService } from '../core/services/card.service';
import { CountItemPricePipe } from '../core/pipes/count-item-price/count-item-price';
import { FormControl, FormGroup } from '@angular/forms';
import { BreakpointService } from '../shared/services/breakpoint.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public shoppingCart$!: Observable<ShoppingCart>;
  public shoppingCartTotalPrice$!: Observable<string>;
  public isLoading$ = this.cardsService.isLoading$;
  public cartItemForm!: FormGroup;
  public cartFormControls = new Map<string, FormControl<number>>();
  public confirmControlEmitter = new EventEmitter<{ formControl: FormControl; cartItem: CartItem }>();
  public screenSize$ = this.breakpointService.screenSize$;
  private destroySubject = new Subject<void>();
  constructor(
    private readonly store: Store,
    private readonly cardsService: CardService,
    private readonly countItemPrice: CountItemPricePipe,
    private readonly breakpointService: BreakpointService,
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
      const controlName = `${i.card.name}-${i.foil}`;
      const control: FormControl<number> = new FormControl(i.count, { nonNullable: true });
      this.cartFormControls.set(controlName, control);
      fg.addControl(controlName, control);
      this.listenToControlChanges(control);
    });

    return fg;
  }

  public remove(card: Card, foil: keyof typeof FOIL) {
    this.store.dispatch(ShoppingCartAction.deleteItem({ card, foil: FOIL[foil] }));
  }

  private listenToControlChanges(inputControl: FormControl) {
    this.confirmControlEmitter
      .pipe(takeUntil(this.destroySubject), withLatestFrom(inputControl.valueChanges))
      .subscribe(([{ formControl, cartItem }, newValue]) => {
        formControl.markAsPristine();
        this.store.dispatch(
          ShoppingCartAction.changeItemCount({ card: cartItem.card, foil: cartItem.foil, newCount: newValue ?? 0 }),
        );
      });
  }

  public confirmChange(formControl: FormControl, cartItem: CartItem) {
    this.confirmControlEmitter.emit({ formControl, cartItem });
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
