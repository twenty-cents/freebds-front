import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GraphicNovelsListPager } from '../../models/bds/graphic-novels/graphic-novels-list-pager';
import { GraphicNovel }           from '../../models/bds/graphic-novels/graphic-novel';

@Injectable({
  providedIn: 'root'
})
export class GraphicNovelsService {

  constructor(private http: HttpClient) { }

  public getGraphicNovelsBySerie(serieId: number, page: number, size: number, sort: string): Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams().set('serieId', serieId.toString())
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<GraphicNovelsListPager>("http://localhost:8080/api/graphic-novels/", { params });
  }

  public getGraphicNovel(id: number): Observable<GraphicNovel> {
    return this.http.get<GraphicNovel>("http://localhost:8080/api/graphic-novels/" + id);
  }
}
