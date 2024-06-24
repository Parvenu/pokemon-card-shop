import { Component, signal } from '@angular/core';
import { distinctUntilChanged, filter, map, merge, of, pairwise, tap } from 'rxjs';
import { VisibilityState } from './shared/models/visibility-state.enum';
import { Direction } from './shared/models/direction.enum';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'pokemon-card-shop';
  public headerVisibilityState = signal(VisibilityState.Visible);
  public readonly SEARCHABLE_PAGES = ['/home'];
  public isHeaderSearchable$ = of(false);

  constructor(
    private readonly scrollDispatcher: ScrollDispatcher,
    private readonly router: Router,
  ) {
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
    this.isHeaderSearchable$ = merge(
      this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((e) => this.canSearch(e.urlAfterRedirects)),
      ),
    );
  }

  private isHeaderHidden(scrollDirection: Direction, scrollOffset: number): boolean {
    return scrollDirection === Direction.Down && scrollOffset > 150;
  }

  private canSearch(url: string): boolean {
    return this.SEARCHABLE_PAGES.includes(url);
  }
}
