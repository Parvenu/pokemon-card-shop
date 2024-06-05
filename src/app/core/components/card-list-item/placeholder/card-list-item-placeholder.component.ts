import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-list-item-placeholder',
  templateUrl: './card-list-item-placeholder.component.html',
  styleUrls: ['./card-list-item-placeholder.component.scss'],
})
export class CardListItemPlaceholderComponent {
  @Input() opacity = 1;
}
