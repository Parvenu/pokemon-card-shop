import { Component, OnInit } from '@angular/core'
import { Card } from '../../shared/models/card.model'
import { Observable} from 'rxjs'

import { Store } from '@ngrx/store';
import { CardsState } from 'src/app/redux-store/reducers/card.reducer';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{
    public cards$: Observable<Card[]> = this.store.select(state => state.cards.cards)
    public areAllCardsLoaded$: Observable<boolean> = this.store.select(state => state.cards.allLoaded)
    constructor(private store: Store<{ cards: CardsState }>) {}
    ngOnInit() {
        this.store.dispatch({ type: '[Cards API] Load cards' })
    }
}