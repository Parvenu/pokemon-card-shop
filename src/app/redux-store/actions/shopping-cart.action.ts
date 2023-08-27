import { createAction, createActionGroup, props } from '@ngrx/store'
import { Card, FOIL } from 'src/app/shared/models/card.model';

export const ShoppingCartAction = createActionGroup({
    source: 'ShoppingCart',
    events: {
        'Add Card': props<{ card: Card, foil: FOIL }>(),
        'Remove Card': props<{ card: Card, foil: FOIL }>(),
      },
})