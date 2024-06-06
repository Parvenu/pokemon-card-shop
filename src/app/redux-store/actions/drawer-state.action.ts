import { createActionGroup, props } from '@ngrx/store';

export const DrawerStateActions = createActionGroup({
  source: 'drawerStateChange',
  events: {
    'Drawer state change': props<{ isDrawerOpen: boolean }>(),
  },
});
