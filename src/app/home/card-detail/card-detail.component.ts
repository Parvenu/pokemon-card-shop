import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ShoppingCartAction } from '../../redux-store/actions/shopping-cart.action';
import { Card, FOIL, Foil } from '../../shared/models/card.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardDetailDialogComponent {
    public card!: Card
    public foil = Object.keys(FOIL) as Array<keyof Foil>
    constructor(@Inject(MAT_DIALOG_DATA) public data: { card: Card }, private store: Store) {
        this.card = data.card
    }

    public add(foil: keyof typeof FOIL) {
        this.store.dispatch(ShoppingCartAction.addCard({card: this.card, foil: FOIL[foil]}))
    }

}