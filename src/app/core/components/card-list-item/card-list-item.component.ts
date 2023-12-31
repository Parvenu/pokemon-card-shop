import { Component, Input, OnInit } from '@angular/core'
import { Card } from '../../../shared/models/card.model'
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialog } from '@angular/material/dialog'
import { CardDetailDialogComponent } from '../../../home/card-detail/card-detail.component'
import { trigger, state, style, transition, animate } from '@angular/animations'


@Component({
  selector: 'app-card-list-item',
  templateUrl: './card-list-item.component.html',
  styleUrls: ['./card-list-item.component.scss'],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {maxHeight: 1500, maxWidth: 1500, minHeight: 1500, minWidth: 1500}}],
  animations: [
    trigger('cardImg', [
      state(
        'active',
        style({
          'opacity': '.2',
        }),
      ),
      transition('default => active', [animate('200ms ease-in-out')]),
      transition('active => default', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class CardListItemComponent implements OnInit {
    @Input() card!: Card
    @Input() displayLowestPrice: boolean = true
    public lowestPrice!: number | string
    public animationState = 'default'
    constructor(private dialog: MatDialog) {}

    public ngOnInit(): void {
        this.lowestPrice = this.getLowestPrice(this.card)
    }

    public openDetailDialog() {
        this.dialog.open(CardDetailDialogComponent, { data: { card: this.card }, panelClass: 'card-detail-dialog'})
    }

    public changeAnimationState(state: 'active' | 'default') {
        this.animationState = state
    }
    
    private getLowestPrice(card: Card): number | string {
        if(card?.tcgplayer == null || card?.tcgplayer.prices == null) return '-'
        return Math.min(...Object.values(card.tcgplayer.prices).map(v => v.low))
    }
}
