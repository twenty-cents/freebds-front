import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

import { Serie } from '../../../models/bds/series/serie';


@Component({
  selector: 'app-serie-item-xs',
  templateUrl: './serie-item-xs.component.html',
  styleUrls: ['./serie-item-xs.component.css']
})
export class SerieItemXsComponent implements OnInit {

  @Input() serie: Serie;
  @Input() context: string;

  seriePageThb: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Add covers to the lightbox
    this.seriePageThb.push({source: this.serie.pageUrl, thumbnail: this.serie.pageThumbnailUrl, title: this.serie.title});

  }

}
