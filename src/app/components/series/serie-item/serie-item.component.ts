import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import {MenuItem} from 'primeng/api';

import { BreadcrumbMainService } from '../../../services/commons/breadcrumb-main.service';
import { SeriesService } from '../../../services/bds/series.service';
import { Serie } from '../../../models/bds/series/serie';


@Component({
  selector: 'app-serie-item',
  templateUrl: './serie-item.component.html',
  styleUrls: ['./serie-item.component.css']
})
export class SerieItemComponent implements OnInit {

  serie: Serie;
  context: string;

  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService,
    private breadcrumbMainService: BreadcrumbMainService

      ) {
        this.serie = {
          categories: '',
          externalId:  '',
          id: 0,
          langage:  '',
          origin:  '',
          pageThumbnailUrl:  '',
          pageUrl:  '',
          siteUrl:  '',
          status:  '',
          synopsys:  '',
          title:  ''
        }
       }

  ngOnInit() {
    // Get the context & serie id from the activated route
    this.route.paramMap.subscribe(params => {
      this.context = params.get('context');

      // Load the serie
      this.seriesService.getSerieById(this.context, +params.get('serie.id')).subscribe(serie => {
        this.serie = serie;

        // Init breacrumb
        let item: MenuItem = { label: this.serie.title, routerLink: ['/series', this.serie.id] };
        this.breadcrumbMainService.add(item);
      });

    });
  }

  ngOnDestroy(): void {
    this.breadcrumbMainService.removeLast();
  }

}
