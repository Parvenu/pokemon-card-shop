import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map, of, startWith, tap } from 'rxjs';
import { Card, RARITY, SUBTYPES, TYPES } from '../../shared/models/card.model';
import { environment } from 'src/environment/environment';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Store } from '@ngrx/store';

@Injectable()
export class CardService {
    private pageSize = 21
    constructor(private http: HttpClient, private store: Store) { }
    
    public getCards(page = 1, filters: {search?: string, rarity?: RARITY, types?: TYPES, subtypes?: SUBTYPES} = {}): Observable<{cards: Card[], allLoaded: boolean}> {
        const {search, rarity, types, subtypes} = filters
        let query = '&q='
        query = `${query}${search ? this.formatQuery(search, 'name') : ''}`
        query = `${query}${rarity ? this.formatQuery(rarity, 'rarity') : ''}`
        query = `${query}${types ? this.formatQuery(types, 'types') : ''}`
        query = `${query}${subtypes ? this.formatQuery(subtypes, 'subtypes') : ''}`
        return this.http.get<ApiResponse<Card>>(`${environment.apiUrl}/cards?q=tcgplayer.url:http*&page=${page}&pageSize=${this.pageSize}${query}`)
            .pipe(map(res => ({cards: res.data, allLoaded: res.page * res.pageSize >= res.totalCount})))
    }

    public getRarities() {

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