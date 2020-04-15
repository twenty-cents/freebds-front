import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Origins } from           '../../models/bds/series/origins';
import { Status } from            '../../models/bds/series/status';
import { Languages } from         '../../models/bds/series/languages';
import { Categories } from        '../../models/bds/series/categories';
import { SerieList } from         '../../models/bds/series/serie-list';
import { SeriesListPager } from   '../../models/bds/series/series-list-pager';
import { Serie } from             '../../models/bds/series/serie';
import { FreeSearchFilters } from '../../models/bds/free-search/free-search-filters';
import { AuthorRoleBySerie } from '../../models/bds/authors/author-role-by-serie';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  filterSubject: Subject<Object> = new Subject();
  freeSearchFiltersSubject: Subject<FreeSearchFilters> = new Subject();
  freeSearchFilters: FreeSearchFilters;

  constructor(private http: HttpClient) { 
    this.freeSearchFiltersSubject.subscribe(data => this.freeSearchFilters = data);
  }

  public getOrigins(): Observable<Origins> {
    return this.http.get<Origins>('http://localhost:8080/api/series/origins');
  }

  public getStatus(): Observable<Status> {
    return this.http.get<Status>('http://localhost:8080/api/series/status');
  }

  public getCategories(): Observable<Categories> {
    return this.http.get<Categories>('http://localhost:8080/api/series/categories');
  }

  public getLanguages(): Observable<Languages> {
    return this.http.get<Languages>('http://localhost:8080/api/series/languages');
  }

  public filterSeries(title: string, origin :string, status: string, category:string, page: number, size: number, sort: string) :Observable<SerieList> {
    // Set parameters
    const params = new HttpParams()
    .set('title', title)
    .set('origin', origin)
    .set('status', status)
    .set('category', category)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);

    return this.http.get<SerieList>('http://localhost:8080/api/series/filter', {params});
  }

  public freeSearchBySeries(freeSearchFilters: FreeSearchFilters, page: number, size: number, sort: string) :Observable<SeriesListPager> {
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

    return this.http.get<SeriesListPager>('http://localhost:8080/api/series/search', {params});
  }

  public getSerieById(id: number): Observable<Serie> {
    return this.http.get<Serie>('http://localhost:8080/api/series/' + id);
  }

  public getSeriesByLetter(letter: string, page: number, size: number, sort: string) :Observable<SeriesListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<SeriesListPager>('http://localhost:8080/api/series/letters/' + letter, {params});
  }

  public getAuthorRolesBySeries(id: number): Observable<AuthorRoleBySerie[]> {
    return this.http.get<AuthorRoleBySerie[]>('http://localhost:8080/api/series/authors/' + id);
  }
}
