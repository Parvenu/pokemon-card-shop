import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { shoppingCartState } from '../../../redux-store/selectors/shopping-cart.selector';

@Component({
  selector: 'app-shopping-cart-button',
  templateUrl: './shopping-cart-button.component.html',
  styleUrls: ['./shopping-cart-button.component.scss'],
})
export class ShoppingCartButtonComponent implements OnInit {
  public shoppingCartItemsCount$!: Observable<number>;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.shoppingCartItemsCount$ = this.store.select(shoppingCartState).pipe(
      map((sc) =>
        sc.items.reduce((acc, cartItem) => {
          return acc + cartItem.count;
        }, 0),
      ),
    );
  }

  public redirect(path: string) {
    this.router.navigateByUrl(path);
  }
}
