import { CardFilters } from 'src/app/shared/models/api.model';
import { FilterActions } from '../actions/filter.action';
import { createReducer, on } from '@ngrx/store';

export const initialState: CardFilters = {
  rarity: undefined,
  types: undefined,
  subtypes: undefined,
  search: undefined,
};

export const filterReducer = createReducer(
  initialState,
  on(FilterActions.filterChange, (state, { types, rarity, subtypes }) => ({
    ...state,
    types,
    rarity,
    subtypes,
  })),
  on(FilterActions.searchChange, (state, { search }) => ({
    ...state,
    search,
  })),
);
