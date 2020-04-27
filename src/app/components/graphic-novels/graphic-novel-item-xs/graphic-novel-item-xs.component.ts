import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { AuthorRole } from '../../../models/bds/authors/author-role';

@Component({
  selector: 'app-graphic-novel-item-xs',
  templateUrl: './graphic-novel-item-xs.component.html',
  styleUrls: ['./graphic-novel-item-xs.component.css']
})
export class GraphicNovelItemXsComponent implements OnInit {

  @Input() graphicNovel: GraphicNovel;
  @Input() context: string;

  graphicNovelCover: any[] = [];
  authors: AuthorRole[] = [];

  constructor(
    private graphicNovelsService: GraphicNovelsService
  ) { }

  ngOnInit(): void {
      // Add covers to the lightbox
      this.graphicNovelCover.push({source: this.graphicNovel.coverPictureUrl, thumbnail: this.graphicNovel.coverThumbnailUrl, title: this.graphicNovel.tome + this.graphicNovel.numEdition + '. ' + this.graphicNovel.title});
  
      // Set author roles
      this.authors = this.graphicNovelsService.setAuthorRoles(this.graphicNovel);
  }

}
