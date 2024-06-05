import { Component, signal } from '@angular/core';
import { distinctUntilChanged, filter, map, pairwise, tap } from 'rxjs';
import { VisibilityState } from './shared/models/visibility-state.enum';
import { Direction } from './shared/models/direction.enum';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokemon-card-shop';
  loading = true;
  headerVisibilityState = signal(VisibilityState.Visible);

  constructor(private readonly scrollDispatcher: ScrollDispatcher) {
    this.scrollDispatcher
      .scrolled(30)
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
        map((v) => (v ? VisibilityState.Hidden : VisibilityState.Visible)),
        tap((v) => this.headerVisibilityState.set(v)),
      )
      .subscribe();

    this.headerVisibilityState;
  }

  private isHeaderHidden(scrollDirection: Direction, scrollOffset: number): boolean {
    return scrollDirection === Direction.Down && scrollOffset > 150;
  }
}
