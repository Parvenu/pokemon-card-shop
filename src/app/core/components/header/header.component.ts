import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { VisibilityState } from '../../../shared/models/visibility-state.enum';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggle', [
      state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(-100%)' })),
      state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding('@toggle')
  public get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }
  private isVisible = true;
  private scrollSubscription!: Subscription;
  constructor(
    private router: Router,
    private scrollService: ScrollService,
  ) {}

  public redirect(path: string) {
    this.router.navigateByUrl(path);
  }

  ngOnInit(): void {
    this.scrollSubscription = this.scrollService.isVisible$.pipe(tap((v) => (this.isVisible = v))).subscribe();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }
}
