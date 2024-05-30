import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { VisibilityState } from '../../../shared/models/visibility-state.enum';
import { FilterDataService } from '../../services/filter-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(-100%)' })),
      state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* <=> *', animate('50ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('filterButton', { read: ElementRef }) filterButton!: ElementRef;
  @Input({ required: true }) isVisible!: VisibilityState;
  constructor(private readonly router: Router, private readonly filterDataService: FilterDataService) {}

  public redirect(path: string) {
    this.router.navigateByUrl(path);
  }
  public toggleFilterNav() {}
  public ngAfterViewInit(): void {
    this.filterDataService.toggleFilterNav$ = fromEvent(this.filterButton.nativeElement, 'click');
  }
}
