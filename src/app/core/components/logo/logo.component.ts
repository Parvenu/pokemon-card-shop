import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  public logoPath = environment.logoPath;
  public screenSize$ = this.breakpointService.screenSize$;
  constructor(
    private readonly router: Router,
    private readonly breakpointService: BreakpointService,
  ) {}
  public redirect(path: string) {
    this.router.navigateByUrl(path);
  }
}
