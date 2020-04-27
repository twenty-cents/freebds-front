import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { FreeSearchFilters } from '../../models/bds/free-search/free-search-filters';
import { GraphicNovelsListPager } from '../../models/bds/graphic-novels/graphic-novels-list-pager';
import { GraphicNovel }           from '../../models/bds/graphic-novels/graphic-novel';
import { LibrarySerieContent } from '../../models/collection/library-serie-content';
import { GraphicNovelXs } from '../../models/bds/graphic-novels/graphic-novel-xs'
import { LibrariesService } from '../libraries/libraries.service';
import { LibraryContent } from '../../models/collection/library-content';
import { Review } from '../../models/collection/review'
import { AuthorRole } from '../../models/bds/authors/author-role';
import { Property } from '../../models/commons/property';
@Injectable({
  providedIn: 'root'
})
export class GraphicNovelsService {

  freeSearchFilters: FreeSearchFilters;

  graphicNovelTableRefreshRequestedSubject: Subject<GraphicNovel> = new Subject();
  graphicNovelListRefreshRequestedSubject: Subject<GraphicNovel> = new Subject();

  constructor(
    private http: HttpClient,
    private librariesService: LibrariesService
    ) { }

  public getGraphicNovelsBySerie(context: string, serieId: number, page: number, size: number, sort: string): Observable<GraphicNovelsListPager> {
    // Set parameters
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
    .set('serieId', serieId.toString())
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<GraphicNovelsListPager>("http://localhost:8080/api/graphic-novels", { params });
  }

  public getMissingGraphicNovelsBySerie(context: string, serieId: number): Observable<GraphicNovelXs[]> {
    // Set parameters
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
    .set('serieId', serieId.toString())
    return this.http.get<GraphicNovelXs[]>("http://localhost:8080/api/graphic-novels/missing", { params });
  }

  public getGraphicNovel(context: string, id: number): Observable<GraphicNovel> {
    const params = new HttpParams()
    .set('context', context)
    .set('libraryId', this.librariesService.getCurrentId().toString())
    return this.http.get<GraphicNovel>("http://localhost:8080/api/graphic-novels/" + id, { params });
  }

  public addToCollection(context: string, librarySerieContent: LibrarySerieContent, serieId: number, graphicNovelId: number, format: number) : Observable<any> {
    let librarySerieId: string = null;
    if(librarySerieContent != null) {
      librarySerieId = librarySerieContent.id.toString()
    }
    const body = { 
      context: context,
      librarySerieId: librarySerieId,
      libraryId: this.librariesService.getCurrentId().toString(),
      serieId: serieId,
      graphicNovelId: graphicNovelId, 
      format: format };
    return this.http.post<any>("http://localhost:8080/api/graphic-novels/library/" + graphicNovelId, body);
    }

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

    public setAuthorRoles(graphicNovel: GraphicNovel) : AuthorRole[] {
      // Affect authors
      let authors: AuthorRole[] = [];
      let property: Property;

      // Scénario
      let scenario = graphicNovel.authorRoles.filter(author => author.role == 'Scénario');
      for (let i = 0; i < scenario.length; i++) {
        property = this.addAuthor(i, scenario[i].role, scenario[i].lastname, scenario[i].firstname, scenario[i].nickname);
        authors.push({id: scenario[i].id, role: property.key, name: property.value});
      }
      // Dessin
      let dessin = graphicNovel.authorRoles.filter(author => author.role == 'Dessin');
      for (let i = 0; i < dessin.length; i++) {
        property = this.addAuthor(i, dessin[i].role, dessin[i].lastname, dessin[i].firstname, dessin[i].nickname);
        authors.push({id: dessin[i].id, role: property.key, name: property.value});
      }
      // Couleurs
      let couleurs = graphicNovel.authorRoles.filter(author => author.role == 'Couleurs');
      for (let i = 0; i < couleurs.length; i++) {
        property = this.addAuthor(i, couleurs[i].role, couleurs[i].lastname, couleurs[i].firstname, couleurs[i].nickname);
        authors.push({id: couleurs[i].id, role: property.key, name: property.value});
      }
      // Autres rôles
      let saveRole: string;
      let index: number;
      for (let i = 0; i < graphicNovel.authorRoles.length; i++) {
        let author = graphicNovel.authorRoles[i];
        if(author.role != 'Scénario' && author.role != 'Dessin' && author.role != "Couleurs") {
          // Don't repeat role on display
          if( author.role != saveRole){
            saveRole = author.role;
            index = 0;
          } else {
            index = 1;
          }
          property = this.addAuthor(index, author.role, author.lastname, author.firstname, author.nickname);
          authors.push({id: author.id, role: property.key, name: property.value});
        }
      }
      return authors;
    }

    private addAuthor(index: number, role: string, lastname: string, firstname: string, nickname: string): Property {
      let property: Property = {
        key: '',
        value: ''
      };
      // Key on each rupt
      if (index == 0)
        property.key = role;
  
      if (lastname != '') {
        property.value = lastname;
        if (firstname != '') {
          property.value += ', ';
        }
      }
  
      if (firstname != '') {
        property.value += firstname;
      }
  
      if (property.value == '') {
        property.value = nickname;
      } else {
        if(nickname != ''){
          property.value += " (" + nickname + ")";
        }
      }
  
      return property;
    }

    
}
