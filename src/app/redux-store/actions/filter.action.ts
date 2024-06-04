import { createActionGroup, props } from '@ngrx/store';

export const FilterActions = createActionGroup({
  source: 'filters',
  events: {
    'Filter change': props<{ rarity?: string; types?: string; subtypes?: string }>(),
    'Search change': props<{ search?: string }>(),
  },
});
