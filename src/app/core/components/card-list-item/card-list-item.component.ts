import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../shared/models/card.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-list-item',
  templateUrl: './card-list-item.component.html',
  styleUrls: ['./card-list-item.component.scss'],
  animations: [
    trigger('cardImg', [
      state(
        'active',
        style({
          opacity: '.2',
        }),
      ),
      transition('default => active', [animate('200ms ease-in-out')]),
      transition('active => default', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CardListItemComponent implements OnInit {
  @Input({ required: true }) card!: Card;
  @Input() displayLowestPrice: boolean = true;
  @Input() canViewDetails: boolean = true;
  @Input({ required: true }) isLoading$!: Observable<boolean>;
  public lowestPrice!: number | null;
  public animationState = 'default';

  constructor(private readonly cardsService: CardService) {}

  public ngOnInit(): void {
    this.lowestPrice = this.getLowestPrice(this.card);
  }

  public viewDetails() {
    this.cardsService.viewDetails(this.card);
  }

  public changeAnimationState(state: 'active' | 'default') {
    this.animationState = state;
  }

  private getLowestPrice(card: Card): number | null {
    if (card?.tcgplayer == null || card?.tcgplayer.prices == null) return null;
    return Math.min(...Object.values(card.tcgplayer.prices).map((v) => v.low));
  }
}
