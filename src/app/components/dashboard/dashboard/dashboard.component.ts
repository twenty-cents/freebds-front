import { Component, OnInit } from '@angular/core';

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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
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
