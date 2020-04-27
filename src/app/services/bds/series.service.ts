import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { LibrariesService } from  '../libraries/libraries.service';
import { Origins } from           '../../models/bds/series/origins';
import { Status } from            '../../models/bds/series/status';
import { Languages } from         '../../models/bds/series/languages';
import { Categories } from        '../../models/bds/series/categories';
import { SerieList } from         '../../models/bds/series/serie-list';
import { SeriesListPager } from   '../../models/bds/series/series-list-pager';
import { Serie } from             '../../models/bds/series/serie';
import { FreeSearchFilters } from '../../models/bds/free-search/free-search-filters';
import { AuthorRoleBySerie } from '../../models/bds/authors/author-role-by-serie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  //filterSubject: Subject<Object> = new Subject();
  //freeSearchFiltersSubject: Subject<FreeSearchFilters> = new Subject();
  freeSearchFilters: FreeSearchFilters;

  constructor(
    private http: HttpClient,
    private librariesService: LibrariesService
    ) { 
    //this.freeSearchFiltersSubject.subscribe(data => this.freeSearchFilters = data);
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

  public getSerieById(context: string, id: number): Observable<Serie> {
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
    .set('serieId', id.toString())
    return this.http.get<Serie>('http://localhost:8080/api/series/' + id, {params});
  }

  public getSeriesByLetter(context: string, letter: string, page: number, size: number, sort: string) :Observable<SeriesListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
    .set('titleStartingWith', letter)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<SeriesListPager>(environment.rootApi + 'series/letter', {params});
  }

  public getAuthorRolesBySeries(context: string, authorId: number): Observable<AuthorRoleBySerie[]> {
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
    return this.http.get<AuthorRoleBySerie[]>('http://localhost:8080/api/series/authors/' + authorId, {params});
  }
}
