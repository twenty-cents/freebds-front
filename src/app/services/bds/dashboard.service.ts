import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Origins } from '../../models/bds/dashboard/origins';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  countReferentialSeries(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/series/count");
  }
  
  countReferentialSeriesByOrigin(): Observable<Origins[]> {
    return this.http.get<Origins[]>("http://localhost:8080/api/series/counts/origin");
  }
  
  countReferentialGraphicNovels(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/graphic-novels/count");
  }
  
  countReferentialAuthors(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/api/authors/count");
  }


}
