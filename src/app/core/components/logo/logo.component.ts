import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  constructor(private readonly router: Router) {}
  public redirect(path: string) {
    this.router.navigateByUrl(path);
  }
}
