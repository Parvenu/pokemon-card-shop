import { createSelector } from '@ngrx/store';
import { cardsFeature } from '../reducers/card.reducer';

export const selectCardListPageViewModel = createSelector(
    cardsFeature.selectCards,
    cardsFeature.selectAllLoaded,
    (cards, allLoaded) => ({ cards, allLoaded })
  );