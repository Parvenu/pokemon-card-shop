import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Card, RARITY, SUBTYPES, TYPES } from '../../shared/models/card.model';
import { CardFilters } from 'src/app/shared/models/api.model';

export const CardsApiActions = createActionGroup({
    source: 'Cards API',
    events: {
        'Load cards': emptyProps(),
        'Load filterd cards': props<{ page: number, filters: CardFilters }>(),
        'Retrieved Card List': props<{ cards: ReadonlyArray<Card>, page?: number, allLoaded: boolean }>(),
        'Error Loading Cards': props<{ errorMsg: string }>(),
    },
  });

