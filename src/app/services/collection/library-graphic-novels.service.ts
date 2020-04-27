import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LibraryContent } from '../../models/collection/library-content';
import { LibrariesService } from '../libraries/libraries.service';
import { Review } from '../../models/collection/review';
@Injectable({
  providedIn: 'root'
})
export class LibraryGraphicNovelsService {

  constructor(
    private http: HttpClient,
    private librariesService: LibrariesService) { }

  public addRating(context: string, review: Review, graphicNovelId: number) : Observable<any> {
    const body = { 
      context: context,
      libraryId: this.librariesService.getCurrentId().toString(),
      librarySerieId: review.librarySerieContentId,
      libraryContentId: review.libraryContentId,
      graphicNovelId: graphicNovelId, 
      reviewId: review.id,
      rating: review.rating,
      comment: review.comment };
    return this.http.post<any>("http://localhost:8080/api/graphic-novels/ratings/" + graphicNovelId, body);
  }

}
