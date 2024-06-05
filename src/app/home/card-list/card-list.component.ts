import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Card } from '../../shared/models/card.model';
import { Observable, Subject, combineLatestWith, filter, map, startWith, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardsState } from '../../redux-store/reducers/card.reducer';
import { CardService } from 'src/app/core/services/card.service';
import { CardFilters } from 'src/app/shared/models/api.model';
import { CardsApiActions } from 'src/app/redux-store/actions/card.action';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  public cards$: Observable<Card[]> = this.store.select((state) => state.cards.cards);
  public areCardsFound$: Observable<boolean> = this.cards$.pipe(map((cards) => cards.length > 0));
  public areAllCardsFetched$: Observable<boolean> = this.store.select((state) => state.cards.allFetched);
  public isLoading$ = this.cardsService.isLoading$;
  private destoryedSubject = new Subject();
  private page = signal(1);
  private filters!: CardFilters;

  constructor(
    private readonly scrollDispatcher: ScrollDispatcher,
    private cardsService: CardService,
    private store: Store<{ cards: CardsState; filters: CardFilters }>,
  ) {}
  ngOnInit() {
    this.store.dispatch({ type: '[Cards API] Load cards' });
    this.initScrollEvents();
    this.store
      .select((state) => state.filters)
      .subscribe((filters) => {
        this.page.set(1);
        this.filters = filters;
        this.store.dispatch(CardsApiActions.loadFilterdCards({ page: this.page(), filters: { ...filters } }));
      });
  }

  private initScrollEvents(): void {
    // infinite scroll, bottom of the page event combined with areAllCardsFetched, so we will not spam call when we have loaded everything
    this.scrollDispatcher
      .scrolled(30)
      .pipe(
        takeUntil(this.destoryedSubject),
        filter((s) => s instanceof CdkScrollable && s.measureScrollOffset('bottom') < 100),
        combineLatestWith(this.areAllCardsFetched$),
        filter(([, areAllCardsFetched]) => areAllCardsFetched === false),
        tap(() => {
          this.page.set(this.page() + 1);
          this.store.dispatch(CardsApiActions.loadFilterdCards({ page: this.page(), filters: this.filters }));
        }),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destoryedSubject.next(true);
  }
}
