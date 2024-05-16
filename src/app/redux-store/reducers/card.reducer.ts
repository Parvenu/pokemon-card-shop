import { createFeature, createReducer, on } from '@ngrx/store';
import { Card } from '../../shared/models/card.model';
import { CardsApiActions } from '../actions/card.action';

export interface CardsState {
  cards: Card[];
  allFetched: boolean;
}

export const initialState: CardsState = {
  cards: [],
  allFetched: false,
};

export const cardsFeature = createFeature({
  name: 'cards',
  reducer: createReducer(
    initialState,
    on(CardsApiActions.retrievedCardList, (state, { cards, page, allFetched }) => {
      if (page && page > 1) {
        return { cards: state.cards.concat(cards), allFetched };
      }
      return { cards: cards.concat([]), allFetched };
    }),
    on(CardsApiActions.loadFilterdCards, (_state, {}) => {
      return _state;
    }),
  ),
});

export const { name, reducer, selectCardsState, selectCards, selectAllFetched } = cardsFeature;
