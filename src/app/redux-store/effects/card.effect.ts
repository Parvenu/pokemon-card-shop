import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CardService } from '../../core/services/card.service';
import { CardsApiActions } from '../actions/card.action';

@Injectable()
export class CardEffects {
  public loadCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardsApiActions.loadCards),
      exhaustMap(() =>
        this.cardsService.getCards().pipe(
          map(({ cards, allFetched }) => CardsApiActions.retrievedCardList({ cards, allFetched })),
          catchError((error: { message: string }) =>
            of(CardsApiActions.errorLoadingCards({ errorMsg: error.message })),
          ),
        ),
      ),
    );
  });

  public filterCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardsApiActions.loadFilterdCards),
      exhaustMap(({ page, filters }) =>
        this.cardsService
          .getCards(page, filters)
          .pipe(map(({ cards, allFetched }) => CardsApiActions.retrievedCardList({ cards, page, allFetched }))),
      ),
    );
  });
  constructor(
    private actions$: Actions,
    private cardsService: CardService,
  ) {}
}
