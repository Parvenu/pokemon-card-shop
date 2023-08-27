import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cardsFeature } from '../reducers/card.reducer';
import { Card } from 'src/app/shared/models/card.model';

// export const selectCards = createFeatureSelector<ReadonlyArray<Card>>('cards')
// export const areAllCardsloaded = createFeatureSelector<boolean>('allLoaded')


export const selectCardListPageViewModel = createSelector(
    cardsFeature.selectCards,
    cardsFeature.selectAllLoaded,
    (cards, allLoaded) => ({ cards, allLoaded })
  );