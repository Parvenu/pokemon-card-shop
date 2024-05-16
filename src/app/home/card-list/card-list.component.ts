import { Component, OnInit } from '@angular/core';
import { Card } from '../../shared/models/card.model';
import { Observable, map, startWith, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardsState } from '../../redux-store/reducers/card.reducer';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  public cards$: Observable<Card[]> = this.store.select((state) => state.cards.cards);
  public areCardsFound$: Observable<boolean> = this.cards$.pipe(map((cards) => cards.length > 0));
  public areAllCardsFetched$: Observable<boolean> = this.store.select((state) => state.cards.allFetched);
  public isLoading$ = this.cardsService.isLoading$;

  constructor(
    private cardsService: CardService,
    private store: Store<{ cards: CardsState }>,
  ) {}
  ngOnInit() {
    this.store.dispatch({ type: '[Cards API] Load cards' });
  }
}
