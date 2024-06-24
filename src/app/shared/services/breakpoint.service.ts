import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';
import { BreakpointsName } from '../models/breakpoints-name.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private screenSizeSubject = new BehaviorSubject<BreakpointsName | null>(null);

  public get screenSize$(): Observable<BreakpointsName | null> {
    return this.screenSizeSubject.asObservable();
  }

  public isSmallScreen$!: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(Object.values(Breakpoints))
      .pipe(
        distinctUntilChanged(),
        map(() => {
          if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) return BreakpointsName.XLarge;
          if (this.breakpointObserver.isMatched(Breakpoints.Large)) return BreakpointsName.Large;
          if (this.breakpointObserver.isMatched(Breakpoints.Medium)) return BreakpointsName.Medium;
          if (this.breakpointObserver.isMatched(Breakpoints.Small)) return BreakpointsName.Small;
          if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) return BreakpointsName.XSmall;
          return null;
        }),
      )
      .subscribe((breakpoint) => this.screenSizeSubject.next(breakpoint));
    this.isSmallScreen$ = this.screenSize$.pipe(map((screenSize) => this.isSmallScreen(screenSize)));
  }

  private isSmallScreen(screenSize: BreakpointsName | null): boolean {
    if (screenSize === null) return false;
    return [BreakpointsName.XSmall, BreakpointsName.Small].includes(screenSize);
  }
}
