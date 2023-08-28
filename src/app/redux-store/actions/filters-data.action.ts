import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Card, RARITY, SUBTYPES, TYPES } from '../../shared/models/card.model';
import { CardFilters } from 'src/app/shared/models/api.model';
import { FiltersData } from 'src/app/shared/models/filters-data.model';

export const FilterDataApiActions = createActionGroup({
    source: 'filterTypes',
    events: {
        'Load all filter data': emptyProps(),
        'Load rarity': emptyProps(),
        'Load types': emptyProps(),
        'Load subtypes': emptyProps(),
        'Retrieved all filter data': props<{ filterData: FiltersData}>(),
        'Retrieved rarity data': props<{ rarity: string[]}>(),
        'Retrieved types data': props<{ types: string[]}>(),
        'Retrieved subtypes data': props<{ subtypes: string[]}>(),
        'Error Loading Cards': props<{ errorMsg: string }>(),
    },
  });