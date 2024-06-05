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
    rarity: concatOrUpsertArray(state.rarity, filterData.rarity),
    types: concatOrUpsertArray(state.types, filterData.types),
    subtypes: concatOrUpsertArray(state.subtypes, filterData.subtypes),
  })),
  on(FilterDataApiActions.retrievedRarityData, (state, { rarity }) => ({
    ...state,
    rarity: concatOrUpsertArray(state.rarity, rarity),
  })),
  on(FilterDataApiActions.retrievedTypesData, (state, { types }) => ({
    ...state,
    types: concatOrUpsertArray(state.types, types),
  })),
  on(FilterDataApiActions.retrievedSubtypesData, (state, { subtypes }) => ({
    ...state,
    subtypes: concatOrUpsertArray(state.subtypes, subtypes),
  })),
);

function concatOrUpsertArray(baseArray: string[], newArray: string[]): string[] {
  return baseArray.length === 0 ? baseArray.concat(newArray) : newArray;
}
