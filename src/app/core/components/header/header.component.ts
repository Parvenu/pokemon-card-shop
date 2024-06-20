import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input } from '@angular/core';
import { VisibilityState } from '../../../shared/models/visibility-state.enum';
import { FilterDataService } from '../../services/filter-data.service';
import { CardService } from '../../services/card.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, share, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(-100%)' })),
      state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
      transition(`${VisibilityState.Hidden} <=> ${VisibilityState.Visible}`, animate('15ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent {
  @Input({ required: true }) isVisible!: VisibilityState;
  @Input({ required: true }) canSearch = false;
  public isLoading$ = this.cardsService.isLoading$;
  public isSmallScreen$!: Observable<boolean>;
  public isMobileSearchBarVisible$!: Observable<boolean>;
  private displaySearchBarEmitter = new EventEmitter<void>();
  private isMobileSearchBarVisible = false;
  constructor(
    private readonly filterDataService: FilterDataService,
    private readonly cardsService: CardService,
    private readonly breakpointObserver: BreakpointObserver,
  ) {
    this.isSmallScreen$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map(({ matches }) => matches));
    this.isMobileSearchBarVisible$ = this.displaySearchBarEmitter.pipe(
      withLatestFrom(this.isSmallScreen$.pipe(map((matches) => !matches))),
      map(() => this.toggleMobileSearchBar()),
      share(),
    );
  }

  public toggleFiltersNav(): void {
    this.filterDataService.toggleFilterNav();
  }

  public onToggleMobileSearchBar(): void {
    this.displaySearchBarEmitter.emit();
  }

  private toggleMobileSearchBar(): boolean {
    return (this.isMobileSearchBarVisible = !this.isMobileSearchBarVisible);
  }
}
