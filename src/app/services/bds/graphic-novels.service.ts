import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FreeSearchFilters } from '../../models/bds/free-search/free-search-filters';
import { GraphicNovelsListPager } from '../../models/bds/graphic-novels/graphic-novels-list-pager';
import { GraphicNovel }           from '../../models/bds/graphic-novels/graphic-novel';

@Injectable({
  providedIn: 'root'
})
export class GraphicNovelsService {

  freeSearchFilters: FreeSearchFilters;

  constructor(private http: HttpClient) { }

  public getGraphicNovelsBySerie(serieId: number, page: number, size: number, sort: string): Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('serieId', serieId.toString())
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<GraphicNovelsListPager>("http://localhost:8080/api/graphic-novels/", { params });
  }

  public getGraphicNovelsBySerieWithContext(context: string, serieId: number, page: number, size: number, sort: string): Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('context', context)
    .set('serieId', serieId.toString())
    .set('libraryId', '1')
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<GraphicNovelsListPager>("http://localhost:8080/api/graphic-novels/", { params });
  }

  public getGraphicNovelsFromLibraryBySerie(serieId: number, page: number, size: number, sort: string): Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams().set('serieId', serieId.toString())
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<GraphicNovelsListPager>("http://localhost:8080/api/graphic-novels/library/", { params });
  }

  public getGraphicNovel(id: number): Observable<GraphicNovel> {
    return this.http.get<GraphicNovel>("http://localhost:8080/api/graphic-novels/with-roles/" + id);
  }

  public freeSearchFromReferentialByGraphicNovels(freeSearchFilters: FreeSearchFilters, page: number, size: number, sort: string) :Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('serietitle', freeSearchFilters.serieTitle)
    .set('serieexternalId', freeSearchFilters.serieExternalId)
    .set('origin', freeSearchFilters.serieOrigin)
    .set('status', freeSearchFilters.serieStatus)
    .set('categories', freeSearchFilters.serieCategory)
    .set('language', freeSearchFilters.serieLanguage)
    .set('graphicnoveltitle', freeSearchFilters.graphicNovelTitle)
    .set('graphicnovelexternalid', freeSearchFilters.graphicNovelExternalId)
    .set('publisher', freeSearchFilters.graphicNovelPublisher)
    .set('collection', freeSearchFilters.graphicNovelCollection)
    .set('isbn', freeSearchFilters.graphicNovelISBN)
    .set('publicationdatefrom', freeSearchFilters.graphicNovelPublicationDateFrom)
    .set('publicationdateto', freeSearchFilters.graphicNovelPublicationDateTo)
    .set('lastname', freeSearchFilters.authorLastname)
    .set('firstname', freeSearchFilters.authorFirstname)
    .set('nickname', freeSearchFilters.authorNickname)
    .set('authorexternalid', freeSearchFilters.authorExternalId)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);

    return this.http.get<GraphicNovelsListPager>('http://localhost:8080/api/graphic-novels/search', {params});
  }

  public freeSearchFromLibraryByGraphicNovels(freeSearchFilters: FreeSearchFilters, page: number, size: number, sort: string) :Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('serietitle', freeSearchFilters.serieTitle)
    .set('serieexternalId', freeSearchFilters.serieExternalId)
    .set('origin', freeSearchFilters.serieOrigin)
    .set('status', freeSearchFilters.serieStatus)
    .set('categories', freeSearchFilters.serieCategory)
    .set('language', freeSearchFilters.serieLanguage)
    .set('graphicnoveltitle', freeSearchFilters.graphicNovelTitle)
    .set('graphicnovelexternalid', freeSearchFilters.graphicNovelExternalId)
    .set('publisher', freeSearchFilters.graphicNovelPublisher)
    .set('collection', freeSearchFilters.graphicNovelCollection)
    .set('isbn', freeSearchFilters.graphicNovelISBN)
    .set('publicationdatefrom', freeSearchFilters.graphicNovelPublicationDateFrom)
    .set('publicationdateto', freeSearchFilters.graphicNovelPublicationDateTo)
    .set('lastname', freeSearchFilters.authorLastname)
    .set('firstname', freeSearchFilters.authorFirstname)
    .set('nickname', freeSearchFilters.authorNickname)
    .set('authorexternalid', freeSearchFilters.authorExternalId)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);

    return this.http.get<GraphicNovelsListPager>('http://localhost:8080/api/graphic-novels-library/search', {params});
  }


}
