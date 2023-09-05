import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Card } from '../../shared/models/card.model';
import { CardFilters } from '../../shared/models/api.model';

export const CardsApiActions = createActionGroup({
    source: 'Cards API',
    events: {
        'Load cards': emptyProps(),
        'Load filterd cards': props<{ page: number, filters: CardFilters }>(),
        'Retrieved Card List': props<{ cards: ReadonlyArray<Card>, page?: number, allLoaded: boolean }>(),
        'Error Loading Cards': props<{ errorMsg: string }>(),
    },
  });

