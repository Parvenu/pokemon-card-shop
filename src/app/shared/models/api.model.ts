import { Card } from './card.model';

export class ApiResponse<T> {
  data!: T[];
  count!: number;
  page!: number;
  pageSize!: number;
  totalCount!: number;
}

export type ApiCard = Omit<Card, 'isHorizontal'>;

export class CardFilters {
  search?: string;
  rarity?: string;
  types?: string;
  subtypes?: string;
}
