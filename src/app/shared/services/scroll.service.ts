import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  isHeaderVisibleSubject = new BehaviorSubject<boolean>(true);

  public get isHeaderVisible$(): Observable<boolean> {
    return this.isHeaderVisibleSubject.asObservable();
  }

  public set isHeaderVisible(v: boolean) {
    this.isHeaderVisibleSubject.next(v);
  }
}
