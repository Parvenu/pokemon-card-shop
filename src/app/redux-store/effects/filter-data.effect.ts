import { Injectable } from '@angular/core';
import { exhaustMap, map, zip } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FilterDataApiActions } from '../actions/filters-data.action';
import { FilterDataService } from '../../core/services/filter-data.service';

@Injectable()
export class FilterDataEffects {
  private loadRarity$ = this.filterTypesService
    .getRarity()
    .pipe(map((rarity) => FilterDataApiActions.retrievedRarityData({ rarity })));
  private loadTypes$ = this.filterTypesService
    .getTypes()
    .pipe(map((types) => FilterDataApiActions.retrievedTypesData({ types })));
  private loadSubtypes$ = this.filterTypesService
    .getSubtypes()
    .pipe(map((subtypes) => FilterDataApiActions.retrievedSubtypesData({ subtypes })));
  public loadAllFiltersData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FilterDataApiActions.loadAllFilterData),
      exhaustMap(() =>
        zip([this.loadRarity$, this.loadTypes$, this.loadSubtypes$]).pipe(
          map(([rarity, types, subtypes]) =>
            FilterDataApiActions.retrievedAllFilterData({
              filterData: {
                rarity: rarity.rarity,
                types: types.types,
                subtypes: subtypes.subtypes,
              },
            }),
          ),
        ),
      ),
    );
  });
  constructor(
    private actions$: Actions,
    private filterTypesService: FilterDataService,
  ) {}
}
