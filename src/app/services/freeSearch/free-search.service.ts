import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { LibrariesService } from '../libraries/libraries.service';
import { SeriesListPager } from   '../../models/bds/series/series-list-pager';
import { GraphicNovelsListPager } from '../../models/bds/graphic-novels/graphic-novels-list-pager';
import { AuthorsListPager } from '../../models/bds/authors/authors-list-pager';
import { FreeSearchFilters } from '../../models/bds/free-search/free-search-filters';

@Injectable({
  providedIn: 'root'
})
export class FreeSearchService {

  freeSearchFilters: FreeSearchFilters;

  constructor(
    private http: HttpClient,
    private librariesService: LibrariesService) { }

  public searchSeries( context: string, freeSearchFilters: FreeSearchFilters, page: number, size: number, sort: string) :Observable<SeriesListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
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
    .set('authorNationality', freeSearchFilters.authorNationality)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);

    return this.http.get<SeriesListPager>('http://localhost:8080/api/search/series', {params});
  }

  public searchGraphicNovels(context: string, freeSearchFilters: FreeSearchFilters, page: number, size: number, sort: string) :Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
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

    return this.http.get<GraphicNovelsListPager>('http://localhost:8080/api/search/graphic-novels', {params});
  }

  public searchAuthors(context: string, freeSearchFilters: FreeSearchFilters, page: number, size: number, sort: string) :Observable<AuthorsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
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

    return this.http.get<AuthorsListPager>('http://localhost:8080/api/search/authors', {params});
  }

}
