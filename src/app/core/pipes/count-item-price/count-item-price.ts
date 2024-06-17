import { Pipe, PipeTransform } from '@angular/core';
import { Attack, FOIL } from 'src/app/shared/models/card.model';
import { CartItem } from 'src/app/shared/models/shopping-cart.model';

@Pipe({
  name: 'countItemPrice',
})
export class CountItemPricePipe implements PipeTransform {
  transform(item: CartItem, foil?: FOIL): string {
    return (foil ? [foil] : [...item.foilCount.keys()])
      .reduce((acc, foil) => {
        return (acc += (item.foilCount.get(foil) ?? 0) * item.card.tcgplayer.prices[foil]!.low);
      }, 0)
      .toFixed(2);
  }
}
