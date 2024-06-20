import { Card, FOIL } from './card.model';

export class ShoppingCart {
  items!: CartItem[];
}

export class CartItem {
  // foilCount!: FoilCount;
  foil!: FOIL;
  count!: number;
  card!: Card;
}

// export type FoilCount = Map<FOIL, number>;
