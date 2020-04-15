import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Nationalities } from '../../models/bds/authors/nationalities';
import { Author }        from '../../models/bds/authors/author';
import { AuthorsListPager } from '../../models/bds/authors/authors-list-pager';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) { }
  
  public getNationalities(): Observable<Nationalities> {
    return this.http.get<Nationalities>('http://localhost:8080/api/authors/nationalities');
  }

  public getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>('http://localhost:8080/api/authors/' + id);
  }  

  public getAuthorsByLetter(letter: string, page: number, size: number, sort: string) :Observable<AuthorsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<AuthorsListPager>('http://localhost:8080/api/authors/letters/' + letter, {params});
  }

}
