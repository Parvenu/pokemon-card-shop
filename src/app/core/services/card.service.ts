import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, BehaviorSubject, Subject } from 'rxjs';
import { Card } from '../../shared/models/card.model';
import { environment } from '../../../environment/environment';
import { ApiCard, ApiResponse, CardFilters } from '../../shared/models/api.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly HORIZONTAL_TYPES = ['LEGEND', 'BREAK'];
  private readonly pageSize = 21;
  loadingSubject = new BehaviorSubject<boolean>(false);
  viewDetailsSubject = new Subject<Card>();

  public get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  public get viewDetails$(): Observable<Card> {
    return this.viewDetailsSubject.asObservable();
  }

  public viewDetails(card: Card): void {
    this.viewDetailsSubject.next(card);
  }

  constructor(private http: HttpClient) {}

  public getCards(page = 1, filters: CardFilters = {}): Observable<{ cards: Card[]; allFetched: boolean }> {
    const { search, rarity, types, subtypes } = filters;
    let query = '&orderBy=name,number&q=';
    query = `${query}${search ? this.formatQuery(search, 'name') : ''}`;
    query = `${query}${rarity ? this.formatQuery(rarity, 'rarity') : ''}`;
    query = `${query}${types ? this.formatQuery(types, 'types') : ''}`;
    query = `${query}${subtypes ? this.formatQuery(subtypes, 'subtypes') : ''}`;
    this.loadingSubject.next(true);
    return this.http
      .get<
        ApiResponse<ApiCard>
      >(`${environment.apiUrl}/cards?q=tcgplayer.url:http*&page=${page}&pageSize=${this.pageSize}${query}`)
      .pipe(
        map((res) => ({
          cards: this.mapCardObject(res.data),
          allFetched: res.page * res.pageSize >= res.totalCount,
        })),
        tap(() => this.loadingSubject.next(false)),
      );
  }

  private formatQuery(input: string | string[], name: string): string {
    if (Array.isArray(input)) {
      return input.reduce((acc, curr) => {
        return (acc += `${name}:"*${curr}*" `);
      }, ` `);
    }
    return ` ${name}:"*${input}*"`;
  }

  private mapCardObject(cards: ApiCard[]): Card[] {
    return cards.map((card) => ({ ...card, isHorizontal: this.shouldRotate(card) }));
  }

  private shouldRotate(card: ApiCard): boolean {
    return this.HORIZONTAL_TYPES.some((i) => card.subtypes?.includes(i));
  }
}
