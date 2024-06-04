import { createFeatureSelector } from '@ngrx/store';
import { CardFilters } from 'src/app/shared/models/api.model';

export const filtersState = createFeatureSelector<CardFilters>('filters');
