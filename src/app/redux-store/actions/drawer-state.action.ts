import { createActionGroup, props } from '@ngrx/store';

export const DrawerStateActions = createActionGroup({
  source: 'filtersDrawerStateChange',
  events: {
    'Drawer state change': props<{ isFiltersDrawerOpen: boolean }>(),
  },
});
