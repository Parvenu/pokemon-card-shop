import { Pipe, PipeTransform } from '@angular/core';
import { Attack, FOIL } from 'src/app/shared/models/card.model';
import { CartItem } from 'src/app/shared/models/shopping-cart.model';

@Pipe({
  name: 'countItemPrice',
})
export class CountItemPricePipe implements PipeTransform {
  transform(item: CartItem): string {
    return (item.count * item.card.tcgplayer.prices[item.foil]!.low).toFixed(2);
  }
}
