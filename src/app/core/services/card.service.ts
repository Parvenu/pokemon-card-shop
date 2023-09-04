import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Card } from '../../shared/models/card.model';
import { environment } from '../../../environment/environment';
import { ApiResponse, CardFilters } from '../../shared/models/api.model';

@Injectable()
export class CardService {
    private pageSize = 21
    constructor(private http: HttpClient) { }
    
    public getCards(page = 1, filters: CardFilters = {}): Observable<{cards: Card[], allLoaded: boolean}> {
        const {search, rarity, types, subtypes} = filters
        let query = '&q='
        query = `${query}${search ? this.formatQuery(search, 'name') : ''}`
        query = `${query}${rarity ? this.formatQuery(rarity, 'rarity') : ''}`
        query = `${query}${types ? this.formatQuery(types, 'types') : ''}`
        query = `${query}${subtypes ? this.formatQuery(subtypes, 'subtypes') : ''}`
        return this.http.get<ApiResponse<Card>>(`${environment.apiUrl}/cards?q=tcgplayer.url:http*&page=${page}&pageSize=${this.pageSize}${query}`)
            .pipe(map(res => ({cards: res.data, allLoaded: res.page * res.pageSize >= res.totalCount})))
    }

    private formatQuery(input: string | string[], name: string): string {
        if(Array.isArray(input)){
            return input.reduce((acc, curr) => {
                return acc += `${name}:"*${curr}*" `
            }, ` `)
        }
        return ` ${name}:"*${input}*"`
    }
}