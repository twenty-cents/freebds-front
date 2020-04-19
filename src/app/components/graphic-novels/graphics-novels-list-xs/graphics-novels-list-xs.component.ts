import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

import { Serie } from '../../../models/bds/series/serie';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';

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

  constructor(
    private graphicNovelsService: GraphicNovelsService) {
 }

  ngOnInit(): void {
  }

  paginate(pageNumber: number) {
        // Load serie's graphic novels
        this.graphicNovelsService.getGraphicNovelsBySerieWithContext(this.context, this.serie.id, 0, 2000, "publicationDate,asc").subscribe(graphicNovelsListPager => {
          this.graphicNovels = graphicNovelsListPager.content;
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
