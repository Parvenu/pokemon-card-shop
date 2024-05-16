import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, throttleTime, map, pairwise, tap, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Direction } from '../models/direction.enum';

// Service for mobile header, we need to share scroll event across multiple components

@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
  private isVisibleSubject$ = new BehaviorSubject<boolean>(true);
  private onSrollSub: Subscription;

  public get isVisible$(): Observable<boolean> {
    return this.isVisibleSubject$.asObservable();
  }

  private set _isVisible(v: boolean) {
    this.isVisibleSubject$.next(v);
  }

  constructor() {
    this.onSrollSub = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(10),
        map(() => window.scrollY),
        pairwise(),
        map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
        tap((direction) => (this._isVisible = !(direction === Direction.Down && window.scrollY > 150))),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onSrollSub.unsubscribe();
  }
}
