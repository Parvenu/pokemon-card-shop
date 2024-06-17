import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VisibilityState } from '../../../shared/models/visibility-state.enum';
import { FilterDataService } from '../../services/filter-data.service';
import { CardService } from '../../services/card.service';

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
  constructor(
    private readonly filterDataService: FilterDataService,
    private readonly cardsService: CardService,
  ) {}

  public toggleFiltersNav(): void {
    this.filterDataService.toggleFilterNav();
  }
}
