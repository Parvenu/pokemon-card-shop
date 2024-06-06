import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, debounceTime, map, takeUntil, tap } from 'rxjs';
import { FilterDataService } from '../core/services/filter-data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { DrawerStateActions } from '../redux-store/actions/drawer-state.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('toggleSpacer', [
      state('false', style({ height: 0 })),
      state('true', style({ height: '6rem' })),
      transition('true <=> false', animate('50ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('filtersNav', { read: MatDrawer }) filtersNav!: MatDrawer;
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;
  mobileQuery$!: Observable<BreakpointState>;
  canScrollToTop$!: Observable<boolean>;
  isDrawerOpen$!: Observable<boolean>;
  private destroySubject = new Subject<boolean>();
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly filterDataService: FilterDataService,
    private readonly store: Store<{ isDrawerOpen: boolean }>,
  ) {
    this.mobileQuery$ = this.breakpointObserver.observe(Breakpoints.XSmall);
    this.isDrawerOpen$ = this.store.select('isDrawerOpen');
  }

  public closeDrawer(): void {
    this.filtersNav.close();
    this.store.dispatch(DrawerStateActions.drawerStateChange({ isDrawerOpen: false }));
  }

  private toggleFiltersNav(): void {
    this.filtersNav.toggle();
    this.store.dispatch(DrawerStateActions.drawerStateChange({ isDrawerOpen: this.filtersNav.opened }));
  }

  public scrollToTop(): void {
    this.scrollable.scrollTo({ top: 0 });
  }

  ngAfterViewInit(): void {
    this.filterDataService.toggleFilterNav$
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => this.toggleFiltersNav());
    this.canScrollToTop$ = this.scrollable.elementScrolled().pipe(
      debounceTime(100),
      map(() => this.scrollable.measureScrollOffset('top') > 100),
    );
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
  }
}
