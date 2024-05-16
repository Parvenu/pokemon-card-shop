import { createFeatureSelector } from '@ngrx/store';
import { ShoppingCart } from '../../shared/models/shopping-cart.model';

export const shoppingCartState = createFeatureSelector<ShoppingCart>('shoppingCart');
