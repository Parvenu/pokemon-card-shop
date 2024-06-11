import { createReducer, on } from '@ngrx/store';
import { DrawerStateActions } from '../actions/drawer-state.action';

const initialState = false;

export const drawerStateReducer = createReducer(
  initialState,
  on(DrawerStateActions.drawerStateChange, (state, { isFiltersDrawerOpen }) => isFiltersDrawerOpen),
);
