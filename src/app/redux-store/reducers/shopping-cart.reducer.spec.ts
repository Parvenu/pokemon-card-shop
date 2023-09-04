import { FoilCount } from 'src/app/shared/models/shopping-cart.model';
import { addCard, removeCard } from './shopping-cart.reducer';
import { FOIL, Card, Foil } from 'src/app/shared/models/card.model';


describe('ShoppingCartReduer', () => {
    const cards = [
        { 
            id: 'a',
            images: {},
            tcgplayer: {
                prices: {
                    [FOIL.normal]: {low: 10},
                    [FOIL.holofoil]: {low: 100}
                }
            }
        },
        { 
            id: 'b',
            images: {},
            tcgplayer: {
                prices: {
                    [FOIL.normal]: {low: 50},
                    [FOIL.holofoil]: {low: 500}
                }
            }
        }
    ] as Card[]

    it('should add item to cart', () => {
        const initialState = {items: []}
        const res = addCard(initialState, {card: cards[0], foil: FOIL.normal})
        expect(res.items.length).toBe(1)
        expect(res.items[0]).toEqual({card: cards[0], foilCount: {[FOIL.normal]: 1} as FoilCount})
    })
    describe('remove from cart', () => {
        it('should decrease item count', () => {
            const cardInCart = cards[0]
            const initialState = {items: [{card: cardInCart, foilCount: {[FOIL.normal]: 2} as FoilCount}]}
            const res = removeCard(initialState, {card: cardInCart, foil: FOIL.normal})
            expect(res.items.length).toBe(1)
            expect(res.items.find((c)=> c.card.id === cardInCart.id)?.foilCount).toEqual({[FOIL.normal]: 1} as FoilCount)
        })
        it('should remove foilType prop if count drops to 0', () => {
            const cardInCart = cards[0]
            const initialState = {items: [{card: cardInCart, foilCount: {[FOIL.normal]: 2, [FOIL.holofoil]: 1} as FoilCount}]}
            const res = removeCard(initialState, {card: cardInCart, foil: FOIL.holofoil})
            expect(res.items.length).toBe(1)
            expect(res.items.find((c)=> c.card.id === cardInCart.id)?.foilCount).toEqual({[FOIL.normal]: 2} as FoilCount)
        })
        it('should remove card if all foilCounts drops to 0', () => {
            const cardInCart = cards[0]
            const initialState = {items: [{card: cardInCart, foilCount: {[FOIL.normal]: 2, [FOIL.holofoil]: 1} as FoilCount}]}
            let res = removeCard(initialState, {card: cardInCart, foil: FOIL.holofoil})
            res = removeCard(res, {card: cardInCart, foil: FOIL.normal})
            res = removeCard(res, {card: cardInCart, foil: FOIL.normal})
            expect(res.items.length).toBe(0)
        })
    })
})