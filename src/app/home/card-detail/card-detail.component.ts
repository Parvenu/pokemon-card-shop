import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShoppingCartAction } from '../../redux-store/actions/shopping-cart.action';
import { Card, FOIL, Foil } from '../../shared/models/card.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailDialogComponent {
  @Input({ required: true }) card!: Card;
  @Output() closeDrawerEvent = new EventEmitter<unknown>();
  public foil = Object.keys(FOIL) as Array<keyof Foil>;
  constructor(private store: Store) {}

  public add(foil: keyof typeof FOIL): void {
    this.store.dispatch(ShoppingCartAction.addItem({ card: this.card, foil: FOIL[foil] }));
  }

  public close(): void {
    this.closeDrawerEvent.emit();
  }
}
