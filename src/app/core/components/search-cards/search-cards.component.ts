import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged, of, startWith } from 'rxjs';
import { CardsApiActions } from 'src/app/redux-store/actions/card.action';
import { CardsState } from 'src/app/redux-store/reducers/card.reducer';
import { FiltersData } from 'src/app/shared/models/filters-data.model';
import { VisibilityState } from 'src/app/shared/models/visibility-state.enum';

@Component({
  selector: 'app-search-cards',
  templateUrl: './search-cards.component.html',
  styleUrls: ['./search-cards.component.scss'],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }], // removing the "hint" section under our mat-input
  // toggle animation to show / hide filters when scrolling down / up
  //   animations: [
  //     trigger('toggle', [
  //       state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(-100%)' })),
  //       state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
  //       transition('* => *', animate('200ms ease-in')),
  //     ]),
  //   ],
})
export class SearchCardsComponent implements OnInit {
  public searchInputCtrl!: FormControl<string>;
  private searchInputFilter$: Observable<string> = of('');

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ cards: CardsState; filtersData: FiltersData }>
  ) {}

  ngOnInit(): void {
    this.searchInputCtrl = this.formBuilder.control<string>('', { nonNullable: true });
    this.searchInputFilter$ = this.searchInputCtrl.valueChanges.pipe(
      startWith(this.searchInputCtrl.value),
      distinctUntilChanged(),
      debounceTime(300)
    );
    this.searchInputFilter$.subscribe((search) =>
      this.store.dispatch(CardsApiActions.loadFilterdCards({ page: 1, filters: { search } }))
    );
  }
}
