import { createFeatureSelector } from '@ngrx/store';

export const isDrawerOpen = createFeatureSelector<boolean>('isDrawerOpen');
