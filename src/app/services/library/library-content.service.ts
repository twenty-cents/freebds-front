import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LibraryContentUpdateRequest } from '../../models/library/request/library-content-update-request';
import { LibraryContentDeleteRequest } from '../../models/library/request/library-content-delete-request';
import { LibraryContent } from '../../models/collection/library-content'
import { LibrariesService } from '../libraries/libraries.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryContentService {

  constructor(
    private http: HttpClient,
    private librariesService: LibrariesService) { }

  /**
   * Update a library content
   * @param libraryContentUpdateRequest 
   */
  public update(libraryContentUpdateRequest : LibraryContentUpdateRequest) : Observable<LibraryContent> {
    const body = { 
      libraryId: this.librariesService.getCurrentId().toString(),
      libraryContentId: libraryContentUpdateRequest.libraryContentId,
      isFavorite : libraryContentUpdateRequest.isFavorite,
      isPaper : libraryContentUpdateRequest.isPhysical,
      isNumeric : libraryContentUpdateRequest.isNumeric,
      isWishlist : libraryContentUpdateRequest.isWishlist
   };
    return this.http.put<LibraryContent>("http://localhost:8080/api/library-content/" + libraryContentUpdateRequest.libraryContentId, body);
  }

  /**
   * Delete a library content
   * @param libraryContentId 
   */
  public delete(libraryContentId: number) : Observable<boolean> {
    const params = { 
      libraryId: this.librariesService.getCurrentId().toString(),
      libraryContentId: libraryContentId,
    };
    return this.http.delete<boolean>("http://localhost:8080/api/library-content/" + params.libraryContentId + '/library/' + params.libraryId);
  }

}
