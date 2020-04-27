import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

import { Serie } from '../../../models/bds/series/serie';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { GraphicNovelXs } from '../../../models/bds/graphic-novels/graphic-novel-xs'

@Component({
  selector: 'app-graphics-novels-list-xs',
  templateUrl: './graphics-novels-list-xs.component.html',
  styleUrls: ['./graphics-novels-list-xs.component.css']
})
export class GraphicsNovelsListXsComponent implements OnInit {

  @Input() context: string;
  @Input() serie: Serie;

  displayedColumns: string[] = ['tome', 'title', 'publicationDate'];

  graphicNovels: GraphicNovel[];
  graphicNovelsAll: GraphicNovel[];
  wishlist: GraphicNovel[] = [];
  missing: GraphicNovelXs[] = [];

  constructor(
    private graphicNovelsService: GraphicNovelsService) {
 }

  ngOnInit(): void {
    this.graphicNovelsService.graphicNovelListRefreshRequestedSubject.subscribe(data => {
      if(this.context != undefined) {
        this.paginate(0);
      }
    });
  }

  paginate(pageNumber: number) {
    // Load serie's graphic novels
    this.graphicNovelsService.getGraphicNovelsBySerie(this.context, this.serie.id, 0, 2000, "publicationDate,asc").subscribe(graphicNovelsListPager => {
      // Filter to hide the wishlist in the collection 
      this.graphicNovels = graphicNovelsListPager.content.filter(e => {
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

      // Filter graphic novels to set the wishlist
      this.wishlist = graphicNovelsListPager.content.filter(e => {
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

    // Load serie's graphic novels missing
    this.graphicNovelsService.getMissingGraphicNovelsBySerie('referential', this.serie.id).subscribe(graphicNovelXs => {
      this.missing = graphicNovelXs;
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
