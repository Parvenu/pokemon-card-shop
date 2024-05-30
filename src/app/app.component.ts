import { Component, NgZone } from '@angular/core';
import {
  auditTime,
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  sampleTime,
  tap,
  throttleTime,
} from 'rxjs';
import { VisibilityState } from './shared/models/visibility-state.enum';
import { Direction } from './shared/models/direction.enum';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokemon-card-shop';
  loading = true;
  headerVisibilityState = VisibilityState.Visible;
  set isHeaderVisible(v: boolean) {
    this.scrollService.isHeaderVisible = v;
  }

  constructor(
    private readonly scrollService: ScrollService,
    private readonly scrollDispatcher: ScrollDispatcher,
    private zone: NgZone
  ) {
    this.scrollDispatcher
      .scrolled(55) // keep it higher than header animation time as we resize the scrollable element
      .pipe(
        filter((s): s is CdkScrollable => s instanceof CdkScrollable),
        map((s) => s.measureScrollOffset('top')),
        pairwise(),
        map(([y1, y2]) => ({
          direction: y1 < y2 ? Direction.Down : Direction.Up,
          currentOffset: y2,
        })),
        map(({ direction, currentOffset }) => this.isHeaderHidden(direction, currentOffset)),
        distinctUntilChanged(),
        tap((v) => (this.isHeaderVisible = !v)),
        map((v) => (v ? VisibilityState.Hidden : VisibilityState.Visible)),
        tap((v) => this.zone.run(() => (this.headerVisibilityState = v)))
      )
      .subscribe();
  }

  private isHeaderHidden(scrollDirection: Direction, scrollOffset: number): boolean {
    return scrollDirection === Direction.Down && scrollOffset > 150;
  }
}
