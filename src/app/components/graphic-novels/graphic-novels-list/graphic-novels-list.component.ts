import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

import { Serie } from '../../../models/bds/series/serie';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { PagerParams } from '../../../models/commons/pager-params';

@Component({
  selector: 'app-graphic-novels-list',
  templateUrl: './graphic-novels-list.component.html',
  styleUrls: ['./graphic-novels-list.component.css']
})
export class GraphicNovelsListComponent implements OnInit {

  @Input() context: string;
  @Input() serie: Serie;

  graphicNovels: GraphicNovel[];
  pager: PagerParams;

  constructor(
    private graphicNovelsService: GraphicNovelsService) {
    this.pager = {
      currentPage: 0,
      totalPages: 0,
      pageTotalElements: 0,
      totalElements: 0,
      size: 0
    };
  }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChange) {
    if (change['context'] != undefined) {
      this.context = change['context'].currentValue;
    }

    if (change['serie'] != undefined) {
      this.serie = change['serie'].currentValue;
      if (this.serie.id != 0) {
        this.paginate(0);
      }
    }
  }

  /**
 * Paginate action event
 * 
 * @param pageNumber the page to show 
 */
  onPaginate(pageNumber) {
    this.paginate(pageNumber);
  }

  /**
 * Paginate to the sent page
 * TODO : refactor this function in onPaginate()
 * 
 * @param pageNumber the page to show
 */
  paginate(pageNumber: number) {
    // Load serie's graphic novels
    this.graphicNovelsService.getGraphicNovelsBySerie(this.context, this.serie.id, pageNumber, 20, "publicationDate,asc").subscribe(graphicNovelsListPager => {
      this.graphicNovels = graphicNovelsListPager.content;

      let currentPager: PagerParams;
      currentPager = {
        currentPage: graphicNovelsListPager.number,
        totalPages: graphicNovelsListPager.totalPages,
        pageTotalElements: this.graphicNovels.length,
        totalElements: graphicNovelsListPager.totalElements,
        size: graphicNovelsListPager.size
      }
      this.pager = currentPager;
    });
  }

}
