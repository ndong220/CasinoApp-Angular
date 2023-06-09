import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private Tabs = 'http://localhost:3000/tabs';

  constructor(private http: HttpClient) { }
  getTabs(): Observable<any[]> {
    return this.http.get<any[]>(this.Tabs);
  }
}
