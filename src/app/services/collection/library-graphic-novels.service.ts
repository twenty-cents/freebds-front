import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryGraphicNovelsService {

  constructor(private http: HttpClient) { }

  public addToCollection(graphicNovelId: number, format: number) : Observable<any> {
    const body = { id: graphicNovelId, format: format };
    return this.http.post<any>("http://localhost:8080/api/library/graphic-novels/" + graphicNovelId, body);
    }
}
