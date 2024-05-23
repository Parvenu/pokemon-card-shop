import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mobileQuery!: Observable<BreakpointState>;
  constructor(breakpointObserver: BreakpointObserver) {
    this.mobileQuery = breakpointObserver.observe(Breakpoints.XSmall);
  }
}
