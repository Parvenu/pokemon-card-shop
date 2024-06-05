import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged, of, startWith } from 'rxjs';
import { CardsApiActions } from 'src/app/redux-store/actions/card.action';
import { FilterActions } from 'src/app/redux-store/actions/filter.action';
import { CardsState } from 'src/app/redux-store/reducers/card.reducer';
import { CardFilters } from 'src/app/shared/models/api.model';
import { FiltersData } from 'src/app/shared/models/filters-data.model';
import { VisibilityState } from 'src/app/shared/models/visibility-state.enum';

@Component({
  selector: 'app-search-cards',
  templateUrl: './search-cards.component.html',
  styleUrls: ['./search-cards.component.scss'],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }], // removing the "hint" section under our mat-input
})
export class SearchCardsComponent implements OnInit {
  public searchInputCtrl!: FormControl<string>;
  private searchInputFilter$: Observable<string> = of('');

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ cards: CardsState; filtersData: FiltersData; filters: CardFilters }>,
  ) {}

  ngOnInit(): void {
    this.searchInputCtrl = this.formBuilder.control<string>('', { nonNullable: true });
    this.searchInputFilter$ = this.searchInputCtrl.valueChanges.pipe(
      startWith(this.searchInputCtrl.value),
      distinctUntilChanged(),
      debounceTime(300),
    );
    this.searchInputFilter$.subscribe((search) => {
      this.store.dispatch(FilterActions.searchChange({ search }));
    });
  }
}
