import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipListbox } from '@angular/material/chips'
import { SubscriptSizing } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { pipe, startWith, distinctUntilChanged, combineLatest, skip, Subscription, tap, debounceTime, Observable, share, map, merge, throttleTime, fromEvent, combineLatestWith, filter, takeUntil, ConnectableObservable, pairwise } from 'rxjs';
import { CardService } from 'src/app/core/services/card.service';
import { CardsApiActions } from 'src/app/redux-store/actions/card.action';
import { FilterDataApiActions } from 'src/app/redux-store/actions/filters-data.action';
import { CardsState } from 'src/app/redux-store/reducers/card.reducer';
import { filtersDataState } from 'src/app/redux-store/selectors/filters-data.selector';
import { CardFilters } from 'src/app/shared/models/api.model';
import { Card, RARITY, SUBTYPES, TYPES } from 'src/app/shared/models/card.model';
import { Direction } from 'src/app/shared/models/direction.enum';
import { FiltersData } from 'src/app/shared/models/filters-data.model';
import { VisibilityState } from 'src/app/shared/models/visibility-state.enum';
import { ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'app-filter-cards',
  templateUrl: './filter-cards.component.html',
  styleUrls: ['./filter-cards.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toggle', [
      state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(-100%)' })),
      state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class FilterCardsComponent implements OnInit, OnDestroy {
    public rarity: string[] = []
    public types: string[] = []
    public subtypes: string[] = []

    private page = 1  

    private isVisible = true
    private scrollSubscription!: Subscription
    public get toggle(): VisibilityState {
        return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden
      }

    public filtersData$ = this.store.select(filtersDataState)
    public filtersFrom!: FormGroup
    public raritySelectCtrl!: FormControl
    public typesSelectCtrl!: FormControl
    public subtypesSelectCtrl!: FormControl
    public searchInputCtrl!: FormControl

    public filteredRarityOptions$!: Observable<string[]>;
    public filteredTypesOptions$!: Observable<string[]>;
    public filteredSubtypesOptions$!: Observable<string[]>;

    private filterSubscription!: Subscription
    private resetForm$ = new EventEmitter()

    private filters!: CardFilters
    
    constructor(private formBuilder: FormBuilder, private scrollService: ScrollService, private store: Store<{ cards: CardsState, filtersData: FiltersData }>, private cardService: CardService) {}

    ngOnInit() {
        this.store.dispatch({ type: '[filterTypes] Load all filter data'})
        this.filtersData$.pipe(tap(({rarity, types, subtypes}) => {
            this.rarity = rarity
            this.types = types
            this.subtypes = subtypes
        })).subscribe()
        // init controls
        this.raritySelectCtrl = this.formBuilder.control<string | null>(null, { nonNullable: true })
        this.typesSelectCtrl = this.formBuilder.control<string | null>(null, { nonNullable: true })
        this.subtypesSelectCtrl = this.formBuilder.control<string | null>(null, { nonNullable: true })
        this.searchInputCtrl = this.formBuilder.control<string>('',)
        // initFiltersForm
        this.filtersFrom = this.formBuilder.group({
            rarity: this.raritySelectCtrl,
            types: this.typesSelectCtrl,
            subtypes: this.subtypesSelectCtrl,
            search: this.searchInputCtrl,
        })
        // setup change listners
        const formControlPipe$ = (control: FormControl) => pipe(startWith(control.value), distinctUntilChanged(), debounceTime(300))
        const raritySelectFilter$ = this.raritySelectCtrl.valueChanges.pipe(formControlPipe$(this.raritySelectCtrl))
        const typesSelectFilter$ = this.typesSelectCtrl.valueChanges.pipe(formControlPipe$(this.typesSelectCtrl))
        const subtypesSelectFilter$ = this.subtypesSelectCtrl.valueChanges.pipe(formControlPipe$(this.subtypesSelectCtrl))
        const searchInputFilter$ = this.searchInputCtrl.valueChanges.pipe(formControlPipe$(this.searchInputCtrl))

        this.filterSubscription = merge(combineLatest([raritySelectFilter$, searchInputFilter$, typesSelectFilter$, subtypesSelectFilter$]), this.resetForm$)
            .pipe(
                skip(1),
                tap(([rarity, search, types, subtypes]) => {
                    this.page = 1
                    this.filters = {rarity, search, types, subtypes}
                    this.store.dispatch(CardsApiActions.loadFilterdCards({page: this.page, filters : this.filters}))
                })      
            ).subscribe()

        this.filteredRarityOptions$ = merge(this.resetForm$, raritySelectFilter$).pipe(
            map((input: string) => typeof input === 'string' ? this.filterSelectOptions(input, this.rarity) : this.rarity.slice())
        )
        this.filteredTypesOptions$ = merge(this.resetForm$, typesSelectFilter$).pipe(
            map((input: string) => typeof input === 'string' ? this.filterSelectOptions(input, this.types) : this.types.slice())
        )
        this.filteredSubtypesOptions$ = merge(this.resetForm$, subtypesSelectFilter$).pipe(
            map((input: string) => typeof input === 'string' ? this.filterSelectOptions(input, this.subtypes) : this.subtypes.slice())
        )
        const areAllCardsLoaded$ = this.store.select(state => {
            return state.cards.allLoaded
        })
        fromEvent(window, 'scroll')
        .pipe(
            throttleTime(100),
            filter(() => window.innerHeight + window.scrollY >= document.body.scrollHeight - 50),
            combineLatestWith(areAllCardsLoaded$),
            filter(([, areAllCardsLoaded]) => {
                return  areAllCardsLoaded === false
            }),
            tap(() => { 
                this.page += 1
                this.store.dispatch(CardsApiActions.loadFilterdCards({page: this.page, filters : this.filtersFrom.value}))
            })
        ).subscribe()

        this.scrollSubscription = this.scrollService.isVisible$.pipe(tap(v => (this.isVisible = v))).subscribe()
    }

    public onResetFilters() {
        this.resetForm$.emit([null, '']) // emit the event manually so it dosen't emit for every from control
        this.filtersFrom.reset({}, {emitEvent: false})
    }

    private filterSelectOptions<T extends string>(input: string, enumToFilter: T[]): T[] {
        const filterValue = input.toLowerCase();
        return enumToFilter.filter(i => i.toLowerCase().includes(filterValue));
      }

    ngOnDestroy(): void {
        this.filterSubscription.unsubscribe()
        this.scrollSubscription.unsubscribe()
    }
}
