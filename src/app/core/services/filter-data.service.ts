import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, concat, map, merge, of, tap } from 'rxjs';
import { ApiResponse } from '../../shared/models/api.model';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class FilterDataService {
  private toggleFilterNavSubject = new Subject<void>();

  public toggleFilterNav() {
    this.toggleFilterNavSubject.next();
  }

  public get toggleFilterNav$(): Observable<void> {
    return this.toggleFilterNavSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public getRarity(): Observable<string[]> {
    return this.http.get<Partial<ApiResponse<string>>>(`${environment.apiUrl}/rarities`).pipe(
      map((res) => {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          throw new Error('could not get rarity data');
        }
        return res.data;
      }),
      catchError(this.handleError),
    );
  }

  public getTypes(): Observable<string[]> {
    return this.http.get<Partial<ApiResponse<string>>>(`${environment.apiUrl}/types`).pipe(
      map((res) => {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          throw new Error('could not get types data');
        }
        return res.data;
      }),
    );
  }

  public getSubtypes(): Observable<string[]> {
    return this.http.get<Partial<ApiResponse<string>>>(`${environment.apiUrl}/subtypes`).pipe(
      map((res) => {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          throw new Error('could not get filters subtypes');
        }
        return res.data;
      }),
    );
  }

  // arrow funtion to avoid binding context in catchError
  // fallback to [] if we cannot fetch filters data
  private handleError = <T>(err: Error, caught: Observable<T>): Observable<[]> => {
    console.error(err.message);
    return of([]);
  };
}
