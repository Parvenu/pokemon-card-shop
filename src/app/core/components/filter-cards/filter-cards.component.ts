import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  pipe,
  startWith,
  distinctUntilChanged,
  combineLatest,
  skip,
  tap,
  debounceTime,
  Observable,
  map,
  merge,
  of,
  Subject,
} from 'rxjs';
import { CardsState } from '../../../redux-store/reducers/card.reducer';
import { filtersDataState } from '../../../redux-store/selectors/filters-data.selector';
import { CardFilters } from '../../../shared/models/api.model';
import { FiltersData } from '../../../shared/models/filters-data.model';
import { VisibilityState } from '../../../shared/models/visibility-state.enum';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { CardService } from 'src/app/core/services/card.service';
import { Router } from '@angular/router';
import { FilterActions } from 'src/app/redux-store/actions/filter.action';

@Component({
  selector: 'app-filter-cards',
  templateUrl: './filter-cards.component.html',
  styleUrls: ['./filter-cards.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // toggle animation to show / hide filters when scrolling down / up
  animations: [
    trigger('toggle', [
      state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(-100%)' })),
      state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => *', animate('100ms ease-in')),
    ]),
  ],
})
export class FilterCardsComponent implements OnInit, OnDestroy {
  public rarity: string[] = [];
  public types: string[] = [];
  public subtypes: string[] = [];

  private isVisible = true;
  public get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  public filtersData$ = this.store.select(filtersDataState);
  public filtersForm!: FormGroup;
  public raritySelectCtrl!: FormControl<string>;
  public typesSelectCtrl!: FormControl<string>;
  public subtypesSelectCtrl!: FormControl<string>;

  public filteredRarityOptions$!: Observable<string[]>;
  public filteredTypesOptions$!: Observable<string[]>;
  public filteredSubtypesOptions$!: Observable<string[]>;

  public scrollLoad$!: Observable<unknown>;

  private destoryedSubject = new Subject<boolean>();

  private filters!: CardFilters;

  private raritySelectFilter$: Observable<string> = of('');
  private typesSelectFilter$: Observable<string> = of('');
  private subtypesSelectFilter$: Observable<string> = of('');

  @ViewChild('autoRarity') autoRarity!: MatAutocomplete;
  @ViewChild('autoTypes') autoTypes!: MatAutocomplete;
  @ViewChild('autoSubtypes') autoSubtypes!: MatAutocomplete;

  @Output() closeDrawerEvent = new EventEmitter<unknown>();

  constructor(
    private readonly router: Router,
    private readonly cardsService: CardService,

    private formBuilder: FormBuilder,
    private store: Store<{ cards: CardsState; filtersData: FiltersData; filters: CardFilters }>,
  ) {}

  ngOnInit() {
    this.store.dispatch({ type: '[filterTypes] Load all filter data' });
    this.filtersData$
      .pipe(
        tap(({ rarity, types, subtypes }) => {
          this.rarity = rarity;
          this.types = types;
          this.subtypes = subtypes;
        }),
      )
      .subscribe();

    this.initControls();
    this.initFiltersForm();
    this.initFormChangeListeners();

    // combineLatest so we can have all last values for every change
    combineLatest([this.raritySelectFilter$, this.typesSelectFilter$, this.subtypesSelectFilter$])
      .pipe(
        skip(1),
        debounceTime(30),
        tap(([rarity, types, subtypes]) => {
          this.filters = { rarity, types, subtypes };
          this.store.dispatch(FilterActions.filterChange({ ...this.filters }));
        }),
      )
      .subscribe();

    this.initSelectFilters();
  }

  // Due to a bug in the autoselect component we have to deselect manually on reset
  // cf https://github.com/angular/components/issues/27652 or https://github.com/angular/components/issues/28093
  public resetSelectFilter(selectCrtl: FormControl<string>, select: MatAutocomplete): void {
    selectCrtl.reset();
    select.options.first.deselect();
  }

  public onResetFilters() {
    this.filtersForm.reset();
    this.autoRarity.options.first.deselect();
    this.autoTypes.options.first.deselect();
    this.autoSubtypes.options.first.deselect();
  }

  private initControls(): void {
    this.raritySelectCtrl = this.formBuilder.control<string>('', { nonNullable: true });
    this.typesSelectCtrl = this.formBuilder.control<string>('', { nonNullable: true });
    this.subtypesSelectCtrl = this.formBuilder.control<string>('', { nonNullable: true });
  }

  private initFiltersForm(): void {
    this.filtersForm = this.formBuilder.group({
      rarity: this.raritySelectCtrl,
      types: this.typesSelectCtrl,
      subtypes: this.subtypesSelectCtrl,
    });
  }

  private filterSelectOptions<T extends string>(input: string, enumToFilter: T[]): T[] {
    const filterValue = input.toLowerCase();
    return enumToFilter.filter((i) => i.toLowerCase().includes(filterValue));
  }

  private initSelectFilters(): void {
    // select filters arrays, filtering user input to autocomplete
    // merging streams that affect filters arrays so the select compoments can pickup the right data
    this.filteredRarityOptions$ = merge(this.raritySelectFilter$, this.filtersData$).pipe(
      map((input: string | FiltersData) =>
        typeof input === 'string' ? this.filterSelectOptions(input, this.rarity) : this.rarity.slice(),
      ),
    );
    this.filteredTypesOptions$ = merge(this.typesSelectFilter$, this.filtersData$).pipe(
      map((input: string | FiltersData) =>
        typeof input === 'string' ? this.filterSelectOptions(input, this.types) : this.types.slice(),
      ),
    );
    this.filteredSubtypesOptions$ = merge(this.subtypesSelectFilter$, this.filtersData$).pipe(
      map((input: string | FiltersData) =>
        typeof input === 'string' ? this.filterSelectOptions(input, this.subtypes) : this.subtypes.slice(),
      ),
    );
  }

  private initFormChangeListeners(): void {
    // setup change listners
    const formControlPipe$ = (control: FormControl) =>
      pipe(startWith(control.value), distinctUntilChanged(), debounceTime(300));
    this.raritySelectFilter$ = this.raritySelectCtrl.valueChanges.pipe(formControlPipe$(this.raritySelectCtrl));
    this.typesSelectFilter$ = this.typesSelectCtrl.valueChanges.pipe(formControlPipe$(this.typesSelectCtrl));
    this.subtypesSelectFilter$ = this.subtypesSelectCtrl.valueChanges.pipe(formControlPipe$(this.subtypesSelectCtrl));
  }

  public closeDrawer() {
    this.closeDrawerEvent.emit();
  }

  public redirect(path: string) {
    this.router.navigateByUrl(path);
  }

  ngOnDestroy(): void {
    this.destoryedSubject.next(true);
  }
}
