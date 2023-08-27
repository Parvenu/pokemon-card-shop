import { createFeatureSelector } from '@ngrx/store'
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model'

export const shoppingCartState = createFeatureSelector<ShoppingCart>('shoppingCart')