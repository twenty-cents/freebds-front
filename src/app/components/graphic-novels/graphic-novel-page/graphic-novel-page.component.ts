import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import {MenuItem} from 'primeng/api';

import { BreadcrumbMainService } from '../../../services/commons/breadcrumb-main.service';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { GraphicNovelsService } from '../../../services/bds/graphic-novels.service';

@Component({
  selector: 'app-graphic-novel-page',
  templateUrl: './graphic-novel-page.component.html',
  styleUrls: ['./graphic-novel-page.component.css']
})
export class GraphicNovelPageComponent implements OnInit {

  graphicNovel: GraphicNovel;

  constructor(
    private route: ActivatedRoute,
    private graphicNovelsService: GraphicNovelsService,
    private breadcrumbMainService: BreadcrumbMainService
  ) { 
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
      pageThumbnailUrl: '',
      serie: {
        categories : '',
        langage : '',
        origin : '',
        status : ''
      }
    }
  }

  ngOnInit(): void {
    // Get the graphic Novel id from the activated route
    this.route.paramMap.subscribe(params => {
      // Load the graphic Novel
      this.graphicNovelsService.getGraphicNovel(+params.get('graphicNovel.id')).subscribe(graphicNovel => {
        this.graphicNovel = graphicNovel;

        // Init breacrumb
        let item: MenuItem = { label: this.graphicNovel.title, routerLink: ['/graphic-novels', this.graphicNovel.id] };
        this.breadcrumbMainService.add(item);
      });

    });
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.breadcrumbMainService.removeLast();
  }

}
