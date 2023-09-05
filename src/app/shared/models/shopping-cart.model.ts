import { Card, FOIL } from './card.model';

export class ShoppingCart {
    items!: CartItem[]
}

export class CartItem {
    foilCount !: FoilCount
    card!: Card
}

export type FoilCount = {[x in keyof typeof FOIL]: number}
