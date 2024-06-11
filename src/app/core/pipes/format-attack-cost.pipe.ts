import { Pipe, PipeTransform } from '@angular/core';
import { Attack } from 'src/app/shared/models/card.model';

@Pipe({
  name: 'formatAttackCost',
})
export class FormatAttackCostPipe implements PipeTransform {
  transform(value: Attack, ...args: unknown[]): string {
    const costMap = new Map<string, number>();
    value.cost.map((cost) => {
      const currentCost = costMap.get(cost);
      currentCost === undefined ? costMap.set(cost, 1) : costMap.set(cost, currentCost + 1);
    });
    let attackCost = '';
    costMap.forEach((value, key) => (attackCost += `, ${key} x${value}`));
    return attackCost.substring(2);
  }
}
