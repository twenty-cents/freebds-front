import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { DashboardService } from '../../../services/bds/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data = [10, 12, 16, 4];
  countReferentialSeries: number = 0;
  countReferentialGraphicNovels: number = 0;
  countReferentialAuthors: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //console.log('TOKEN=' + params.get('code'));
      console.log(params);
    });

    this.route.paramMap.subscribe(params => {
      //console.log('TOKEN=' + params.get('code'));
      console.log(params);
    });

    this.route.params.subscribe(params => {
      //console.log('TOKEN=' + params.get('code'));
      console.log(params);
    });

    // Count series in the referential db
    this.dashboardService.countReferentialSeries().subscribe(data => {
      this.countReferentialSeries = data;
    });

    // Count graphic novels in the referential db
    this.dashboardService.countReferentialGraphicNovels().subscribe(data => {
      this.countReferentialGraphicNovels = data;
    });

    // Count authors in the referential db
    this.dashboardService.countReferentialAuthors().subscribe(data => {
      this.countReferentialAuthors = data;
    });


  }

}
