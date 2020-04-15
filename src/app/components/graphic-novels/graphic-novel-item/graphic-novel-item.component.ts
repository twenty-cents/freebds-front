import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

import {MenuItem} from 'primeng/api';

import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { GraphicNovelsListPager } from '../../../models/bds/graphic-novels/graphic-novels-list-pager';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { Property } from '../../../models/commons/property';
import { AuthorRole } from '../../../models/bds/authors/author-role';
import { LibraryGraphicNovelsService } from '../../../services/collection/library-graphic-novels.service';

@Component({
  selector: 'app-graphic-novel-item',
  templateUrl: './graphic-novel-item.component.html',
  styleUrls: ['./graphic-novel-item.component.css']
})
export class GraphicNovelItemComponent implements OnInit {

  @Input() graphicNovel: GraphicNovel;

  authors: AuthorRole[] = [];

  addItems: MenuItem[];

  constructor(
    private graphicNovelsService: GraphicNovelsService,
    private libraryGraphicNovelsService: LibraryGraphicNovelsService) {
    this.graphicNovel = {
      id: 0,
      externalId: '',
      graphicNovel_Url: '',
      tome: '',
      numEdition: '',
      title: '',
      publisher: '',
      collection: '',
      authorRoles: undefined,
      publicationDate: '',
      releaseDate: '',
      isbn: '',
      totalPages: 0,
      format: '',
      infoEdition: '',
      isOriginalEdition: false,
      externalIdOriginalPublication: '',
      isIntegrale: false,
      isBroche: false,
      coverPictureUrl: '',
      coverThumbnailUrl: '',
      backCoverPictureUrl: '',
      backCoverThumbnailUrl: '',
      pageUrl: '',
      pageThumbnailUrl: ''
    } 
  }

  ngOnInit() {
    this.addItems = [
      {label: 'Format numérique (défaut)', icon: 'pi pi-cloud', command: () => {
          this.addToCollection(1);
      }},
      {label: 'Format physique', icon: 'pi pi-image', command: () => {
          this.addToCollection(2);
      }},
      {separator: true},
      {label: 'Liste de souhaits', icon: 'pi pi-tag', command: () => {
        this.addToCollection(3);
    }}
  ];
  }

  initGraphicNovel() {
      // Affect authors
      let authors: AuthorRole[] = [];
      let property: Property;

      // Scénario
      let scenario = this.graphicNovel.authorRoles.filter(author => author.role == 'Scénario');
      for (let i = 0; i < scenario.length; i++) {
        property = this.addAuthor(i, scenario[i].role, scenario[i].lastname, scenario[i].firstname, scenario[i].nickname);
        authors.push({id: scenario[i].id, role: property.key, name: property.value});
      }
      // Dessin
      let dessin = this.graphicNovel.authorRoles.filter(author => author.role == 'Dessin');
      for (let i = 0; i < dessin.length; i++) {
        property = this.addAuthor(i, dessin[i].role, dessin[i].lastname, dessin[i].firstname, dessin[i].nickname);
        authors.push({id: dessin[i].id, role: property.key, name: property.value});
      }
      // Couleurs
      let couleurs = this.graphicNovel.authorRoles.filter(author => author.role == 'Couleurs');
      for (let i = 0; i < couleurs.length; i++) {
        property = this.addAuthor(i, couleurs[i].role, couleurs[i].lastname, couleurs[i].firstname, couleurs[i].nickname);
        authors.push({id: couleurs[i].id, role: property.key, name: property.value});
      }
      // Autres rôles
      let saveRole: string;
      let index: number;
      for (let i = 0; i < this.graphicNovel.authorRoles.length; i++) {
        let author = this.graphicNovel.authorRoles[i];
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
      this.authors = authors;
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


  ngOnChanges(change: SimpleChange) {
    this.graphicNovel = change['graphicNovel'].currentValue;
    if (this.graphicNovel.id === 0 || this.graphicNovel.id === undefined || this.graphicNovel.id === null){
    } else {
      this.initGraphicNovel();
    }
  }

  /**
   * Add a graphic novel to the user's collection
   * @param: Format :
   *          - 0 = default (->numeric)
   *          - 1 = numeric
   *          - 2 = phusical
   *          - 3 = wishlist
   */
  addToCollection(format: number) {
    this.libraryGraphicNovelsService.addToCollection(this.graphicNovel.id, format).subscribe(data => {
      console.log(data);
    });
  }

}
