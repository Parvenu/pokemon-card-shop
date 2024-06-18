import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Card, FOIL } from '../../shared/models/card.model';

export const ShoppingCartAction = createActionGroup({
  source: 'ShoppingCart',
  events: {
    'Add item': props<{ card: Card; foil: FOIL }>(),
    'Delete Item': props<{ card: Card; foil: FOIL }>(),
    'Change item count': props<{ card: Card; foil: FOIL; newCount: number }>(),
    'Shopping Cart updated': emptyProps(),
  },
});
