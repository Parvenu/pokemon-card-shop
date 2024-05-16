import { createReducer, on } from '@ngrx/store';
import { FilterDataApiActions } from '../actions/filters-data.action';

export const initialState: { rarity: string[]; types: string[]; subtypes: string[] } = {
  rarity: [],
  types: [],
  subtypes: [],
};

export const filterTypesReducer = createReducer(
  initialState,
  on(FilterDataApiActions.retrievedAllFilterData, (state, { filterData }) => ({
    ...state,
    rarity: state.rarity.concat(filterData.rarity),
    types: state.types.concat(filterData.types),
    subtypes: state.subtypes.concat(filterData.subtypes),
  })),
  on(FilterDataApiActions.retrievedRarityData, (state, { rarity }) => ({
    ...state,
    rarity: state.rarity.concat(rarity),
  })),
  on(FilterDataApiActions.retrievedTypesData, (state, { types }) => ({ ...state, types: state.types.concat(types) })),
  on(FilterDataApiActions.retrievedSubtypesData, (state, { subtypes }) => ({
    ...state,
    subtypes: state.subtypes.concat(subtypes),
  })),
);
