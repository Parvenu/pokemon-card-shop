import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, debounceTime, map, takeUntil } from 'rxjs';
import { FilterDataService } from '../core/services/filter-data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { DrawerStateActions } from '../redux-store/actions/drawer-state.action';
import { CardService } from '../core/services/card.service';
import { Card } from '../shared/models/card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('filtersNav') filtersDrawer!: MatDrawer;
  @ViewChild('detailsNav') detailsDrawer!: MatDrawer;
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;
  public isSmallScreen$!: Observable<BreakpointState>;
  public canScrollToTop$!: Observable<boolean>;
  public isFiltersDrawerOpen$!: Observable<boolean>;
  public detailsCard!: Card;
  public isDetailsDrawerOpen$!: Observable<boolean>;
  private destroySubject = new Subject<boolean>();
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly filterDataService: FilterDataService,
    private readonly cardsService: CardService,
    private readonly store: Store<{ isFiltersDrawerOpen: boolean }>,
  ) {
    this.isSmallScreen$ = this.breakpointObserver.observe(Breakpoints.Small);
    this.isFiltersDrawerOpen$ = this.store.select('isFiltersDrawerOpen');
  }

  public closeFiltersDrawer(): void {
    this.filtersDrawer.close();
    this.store.dispatch(DrawerStateActions.drawerStateChange({ isFiltersDrawerOpen: false }));
  }

  public scrollToTop(): void {
    this.scrollable.scrollTo({ top: 0 });
  }

  private toggleFiltersDrawer(): void {
    this.filtersDrawer.toggle();
    this.store.dispatch(DrawerStateActions.drawerStateChange({ isFiltersDrawerOpen: this.filtersDrawer.opened }));
  }
  private openDetailsDrawer(): void {
    this.detailsDrawer.open();
  }

  public ngAfterViewInit(): void {
    this.isDetailsDrawerOpen$ = this.detailsDrawer.openedChange;
    this.filterDataService.toggleFilterNav$
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => this.toggleFiltersDrawer());

    this.cardsService.viewDetails$.pipe(takeUntil(this.destroySubject)).subscribe((card: Card) => {
      this.detailsCard = card;
      this.openDetailsDrawer();
    });

    this.canScrollToTop$ = this.scrollable.elementScrolled().pipe(
      debounceTime(100),
      map(() => this.scrollable.measureScrollOffset('top') > 100),
    );
  }

  public ngOnDestroy(): void {
    this.destroySubject.next(true);
  }
}
