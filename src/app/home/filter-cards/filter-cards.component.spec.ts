import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterCardsComponent } from './filter-cards.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReduxStoreModule } from 'src/app/redux-store/redux-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState as filterInitialState } from 'src/app/redux-store/reducers/filters-data.reducer';
import { initialState as cardsInitialState } from 'src/app/redux-store/reducers/card.reducer';
import { CardsApiActions } from 'src/app/redux-store/actions/card.action';

describe('FilterCardsComponent', () => {
  let component: FilterCardsComponent
  let fixture: ComponentFixture<FilterCardsComponent>
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCardsComponent],
      imports: [CommonModule, SharedModule, CoreModule, ReduxStoreModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState: {filterTypes: filterInitialState, cards: cardsInitialState} }),
      ],
    });
    fixture = TestBed.createComponent(FilterCardsComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore);
    fixture.detectChanges()
  })

  it('should create a form with 4 controls', () => {
        expect(component.filtersFrom.contains('rarity')).toBeTruthy()
		expect(component.filtersFrom.contains('types')).toBeTruthy()
		expect(component.filtersFrom.contains('subtypes')).toBeTruthy()
		expect(component.filtersFrom.contains('search')).toBeTruthy()
  })

  describe('form filters', () => {
    it('should dispatch event on any filter input change', () => {
        const dispatchSpy = spyOn(store, 'dispatch')
        component.ngOnInit()
        expect(dispatchSpy).toHaveBeenCalledWith({ type: '[filterTypes] Load all filter data' })
        component.filtersFrom.controls['rarity'].setValue('toto')
        component.filtersFrom.controls['rarity'].valueChanges.subscribe(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(CardsApiActions.loadFilterdCards({page: 1, filters : {rarity: 'toto'}}))
        })
        component.filtersFrom.get('types')?.setValue('toto')
        component.filtersFrom.controls['types'].valueChanges.subscribe(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(CardsApiActions.loadFilterdCards({page: 1, filters : {rarity: 'toto', types: 'toto'}}))
        })
        component.filtersFrom.get('subtypes')?.setValue('toto')
        component.filtersFrom.controls['subtypes'].valueChanges.subscribe(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(CardsApiActions.loadFilterdCards({page: 1, filters : {rarity: 'toto', types: 'toto', subtypes: 'toto'}}))
        })
        component.filtersFrom.get('search')?.setValue('toto')
        component.filtersFrom.controls['search'].valueChanges.subscribe(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(CardsApiActions.loadFilterdCards({page: 1, filters : {rarity: 'toto', types: 'toto', subtypes: 'toto', search: 'toto'}}))
        })
    })

    it('should dispatch only one event on form reset', () => {
        const dispatchSpy = spyOn(store, 'dispatch')
        component.ngOnInit()
        expect(dispatchSpy).toHaveBeenCalledWith({ type: '[filterTypes] Load all filter data' })

        component.onResetFilters()
        component.filtersFrom.valueChanges.subscribe(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(CardsApiActions.loadFilterdCards({page: 1, filters : {rarity: '', types: '', subtypes: '', search: ''}}))
            expect(dispatchSpy).toHaveBeenCalledTimes(2)
        })
    })
  })

  describe('scroll event', () => {
    it('should dispatch api event when scrolled down to the bottom of the page', () => {
        const dispatchSpy = spyOn(store, 'dispatch')
        component.ngOnInit()
        expect(dispatchSpy).toHaveBeenCalledWith({ type: '[filterTypes] Load all filter data' })

        // setting scroll to bottom of the page and triggering scrollevent
        window.scrollY = window.innerHeight - 1
        document.dispatchEvent(new CustomEvent('scroll'))
        component.scrollLoad$.subscribe(() => {
            expect(dispatchSpy).toHaveBeenCalledTimes(2)
            expect(dispatchSpy).toHaveBeenCalledWith(CardsApiActions.loadFilterdCards({page: 2, filters : {rarity: '', types: '', subtypes: '', search: ''}}))
        })
    })
  })
})