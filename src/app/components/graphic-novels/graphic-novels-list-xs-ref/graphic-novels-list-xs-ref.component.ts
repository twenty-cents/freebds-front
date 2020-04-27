import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

import { Serie } from '../../../models/bds/series/serie';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { GraphicNovelXs } from '../../../models/bds/graphic-novels/graphic-novel-xs'

@Component({
  selector: 'app-graphic-novels-list-xs-ref',
  templateUrl: './graphic-novels-list-xs-ref.component.html',
  styleUrls: ['./graphic-novels-list-xs-ref.component.css']
})
export class GraphicNovelsListXsRefComponent implements OnInit {

 
  @Input() context: string;
  @Input() serie: Serie;

  displayedColumns: string[] = ['tome', 'title', 'publicationDate'];

  library: GraphicNovel[];
  graphicNovels: GraphicNovel[];
  wishlist: GraphicNovel[] = [];


  constructor(
    private graphicNovelsService: GraphicNovelsService) {
 }

  ngOnInit(): void {
    this.graphicNovelsService.graphicNovelListRefreshRequestedSubject.subscribe(data => {
      if(this.context != undefined) {
        this.paginate(0);
      }
    })
  }

  paginate(pageNumber: number) {
    // Load serie's graphic novels in the referential
    this.graphicNovelsService.getGraphicNovelsBySerie(this.context, this.serie.id, 0, 2000, "publicationDate,asc").subscribe(graphicNovelsListPager => {
      this.graphicNovels = graphicNovelsListPager.content;
      // Filter graphic novels to set the wishlist
      this.wishlist = this.graphicNovels.filter(e => {
        if(e.libraryContent != null) {
          if(e.libraryContent.isWishlist == true) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    });

    // Load serie's graphic novels 
    this.graphicNovelsService.getGraphicNovelsBySerie('library', this.serie.id, 0, 2000, "publicationDate,asc").subscribe(graphicNovelsListPager => {
      this.library = graphicNovelsListPager.content.filter(e => {
        if(e.libraryContent != null) {
          if(e.libraryContent.isWishlist == true) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      });
      
    });
  }

  ngOnChanges(change: SimpleChange) {
    if (change['context'] != undefined) {
      this.context = change['context'].currentValue;
    }
    if (change['serie'] != undefined) {
      this.serie = change['serie'].currentValue;
      if(this.serie.id != 0) {
        this.paginate(0);
      }
    }
  }
}
