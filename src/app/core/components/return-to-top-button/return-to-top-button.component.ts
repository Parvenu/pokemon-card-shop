import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-return-to-top-button',
  templateUrl: './return-to-top-button.component.html',
  styleUrl: './return-to-top-button.component.scss',
})
export class ReturnToTopButtonComponent {
  @Output() returnToTop = new EventEmitter<Event>();
}
