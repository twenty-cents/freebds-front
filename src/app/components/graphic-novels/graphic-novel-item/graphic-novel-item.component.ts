import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

import {MenuItem} from 'primeng/api';
import {LightboxModule} from 'primeng/lightbox';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { Serie } from '../../../models/bds/series/serie';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { GraphicNovelsListPager } from '../../../models/bds/graphic-novels/graphic-novels-list-pager';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { Property } from '../../../models/commons/property';
import { AuthorRole } from '../../../models/bds/authors/author-role';
import { User } from '../../../models/security/user';
import { UserService } from '../../../services/security/user.service';
import { Review } from 'src/app/models/collection/review';
import { GraphicNovelItemDialogComponent } from '../../graphic-novels/graphic-novel-item-dialog/graphic-novel-item-dialog.component';
import { LibraryContentDialogInput } from '../../../models/library/library-content-dialog-input';
import { LibraryContentDialogOutput } from '../../../models/library/library-content-dialog-output';
import { LibraryContentService } from '../../../services/library/library-content.service';
@Component({
  selector: 'app-graphic-novel-item',
  templateUrl: './graphic-novel-item.component.html',
  styleUrls: ['./graphic-novel-item.component.css']
})
export class GraphicNovelItemComponent implements OnInit {

  @Input() context: string;
  @Input() serie: Serie;
  @Input() graphicNovel: GraphicNovel;

  authors: AuthorRole[] = [];
  myReview: Review;
  addItems: MenuItem[];
  
  cover: any[] = [];
  page: any[] = [];
  backCover: any[] = [];

  note: number = 4;
  inCollection = false;

  constructor(
    private userService: UserService,
    private graphicNovelsService: GraphicNovelsService,
    private libraryContentService: LibraryContentService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {

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

      // Btn Add to collection
      if(this.graphicNovel.libraryContent !== null) {
          this.inCollection = true;
      }

      // Add covers to the lightbox
      this.cover.push({source: this.graphicNovel.coverPictureUrl, thumbnail: this.graphicNovel.coverThumbnailUrl, title:'Couverture recto'});
      this.page.push({source: this.graphicNovel.pageUrl, thumbnail: this.graphicNovel.pageThumbnailUrl, title:'Extrait'});
      this.backCover.push({source: this.graphicNovel.backCoverPictureUrl, thumbnail: this.graphicNovel.backCoverThumbnailUrl, title:'Couverture verso'});

      // Rating
      this.note = undefined;
      if(!!this.graphicNovel.reviews) {
        this.graphicNovel.reviews.forEach(el => {
          if(el.userId == this.userService.user.id) {
            this.note = el.rating;
            this.myReview = el;
          }
        });
      }
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
    if (change['context'] != undefined) {
      this.context = change['context'].currentValue;
    }

    if (change['graphicNovel'] != undefined) {
      this.graphicNovel = change['graphicNovel'].currentValue;
      if (this.graphicNovel.id === 0 || this.graphicNovel.id === undefined || this.graphicNovel.id === null){
      } else {
        this.initGraphicNovel();
      }
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
    this.graphicNovelsService.addToCollection(this.context, this.serie.librarySerieContent, this.serie.id, this.graphicNovel.id, format).subscribe(data => {
      this.inCollection = true;
      // Refresh all associates lists
      this.graphicNovelsService.graphicNovelListRefreshRequestedSubject.next(this.graphicNovel);
      // Display a confirmation message to the user
      let snackBarRef = this.snackBar.open(this.graphicNovel.title, "ajouté dans ma collection.", {
        duration: 4000,
      });
    });
  }

  removeFromCollection(): void {
    this.libraryContentService.delete(this.graphicNovel.libraryContent.id).subscribe(result => {
      if(result) {
        // Refresh all associates lists
        this.graphicNovelsService.graphicNovelTableRefreshRequestedSubject.next(this.graphicNovel);
        this.graphicNovelsService.graphicNovelListRefreshRequestedSubject.next(this.graphicNovel);

        let snackBarRef = this.snackBar.open(this.graphicNovel.title, "supprimé de la collection.", {
          duration: 4000,
        });
      }
    }, error => {
      console.log("Delete error!");
    })
  }

  handleRate($event): void {
    this.updateRating($event.value);
  }

  handleCancelRate($event): void {
    this.updateRating(0);
  }

  updateRating(rating: number) {
    if(! this.myReview) {
      this.myReview = {
        id: null,
        librarySerieContentId: this.serie.librarySerieContent.id,
        libraryContentId: this.graphicNovel.libraryContent.id,
        userId: this.userService.user.id,
        rating: rating,
        comment: null
      }
    } else {
      this.myReview.rating = rating;
    }

    this.graphicNovelsService.addRating(this.context, this.myReview, this.graphicNovel.id).subscribe(data => {
      this.inCollection = true;
      let snackBarRef = this.snackBar.open(this.graphicNovel.title, "Note modifiée.", {
        duration: 4000,
      });
    });
  }

  handleUpdateGc(): void {
    const libraryContentDialogInput: LibraryContentDialogInput = {
      serie : this.graphicNovel.serie,
      graphicNovel: this.graphicNovel
    };

    const dialogRef = this.dialog.open(GraphicNovelItemDialogComponent, {
      width: '500px',
      data: libraryContentDialogInput
    });

    dialogRef.afterClosed().subscribe(libraryContentDialogOutput => {
      if(libraryContentDialogOutput.status === 'VALIDATED') {
        this.graphicNovel.libraryContent = libraryContentDialogOutput.libraryContent;
        let snackBarRef = this.snackBar.open(this.graphicNovel.title, "mis à jour.", {
          duration: 4000,
        });
      }
    });
  }
}
