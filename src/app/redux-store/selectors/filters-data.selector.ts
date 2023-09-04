import { createFeatureSelector } from '@ngrx/store';
import { FiltersData } from '../../shared/models/filters-data.model';

export const filtersDataState= createFeatureSelector<FiltersData>('filterTypes')
