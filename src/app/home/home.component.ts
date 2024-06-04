import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { FilterDataService } from '../core/services/filter-data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  private navSub!: Subscription;
  constructor(private breakpointObserver: BreakpointObserver, private filterDataService: FilterDataService) {
    this.mobileQuery$ = this.breakpointObserver.observe(Breakpoints.XSmall);
  }

  public closeDrawer() {
    this.filtersNav.close();
  }

  private toggleFiltersNav() {
    this.filtersNav.toggle();
  }

  ngAfterViewInit(): void {
    this.navSub = this.filterDataService.toggleFilterNav$.subscribe(() => this.toggleFiltersNav());
  }

  ngOnDestroy(): void {
    this.navSub.unsubscribe();
  }
}
