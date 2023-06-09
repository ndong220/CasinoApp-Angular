import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dealer } from '../../models/menu-item';
@Injectable({
  providedIn: 'root'
})
export class DealerServiceService {
  private apiUrl = 'http://localhost:3000/dealers';
  constructor(
    private http: HttpClient
  ) { }
  getDealerById(id: number): Observable<Dealer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Dealer>(url);
  }
}
