import { createFeatureSelector } from '@ngrx/store';
import { FiltersData } from 'src/app/shared/models/filters-data.model';

export const filtersDataState= createFeatureSelector<FiltersData>('filterTypes')
