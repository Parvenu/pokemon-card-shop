import { Card, FOIL, Foil } from './card.model';

export class ShoppingCart {
    items!: CartItem[]
}

export class CartItem {
    // foilCount!: {
    //     foil: FOIL
    //     count: number
    // }[]
    foilCount !: FoilCount
    card!: Card
}

export type FoilCount = {[x in keyof typeof FOIL]: number}
