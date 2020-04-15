import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { SeriesService } from '../../../services/bds/series.service';
import { Serie } from '../../../models/bds/series/serie';


@Component({
  selector: 'app-serie-item',
  templateUrl: './serie-item.component.html',
  styleUrls: ['./serie-item.component.css']
})
export class SerieItemComponent implements OnInit {

  serie: Serie;


  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService,

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
    // Get the serie id from the activated route
    this.route.paramMap.subscribe(params => {
      // Load the serie
      this.seriesService.getSerieById(+params.get('serie.id')).subscribe(serie => {
        this.serie = serie;
      });

    });
  }

}
