import { Component, OnInit, ElementRef, ViewEncapsulation, Input } from '@angular/core';

import * as d3 from 'd3';

import { DashboardService } from '../../../services/bds/dashboard.service';
import { Origins } from '../../../models/bds/dashboard/origins';

@Component({
  selector: 'app-origins2',
  templateUrl: './origins2.component.html',
  styleUrls: ['./origins2.component.css']
})
export class Origins2Component implements OnInit {

  data: Origins[] = [];
  hostElement; // Native element hosting the SVG container
  svg; // Top level SVG element
  g; // SVG Group element
  arc; // D3 Arc generator
  innerRadius; // Inner radius of donut chart
  radius; // Outer radius of donut chart
  slices; // Donut chart slice elements
  labels; // SVG data label elements
  totalLabel; // SVG label for total
  rawData; // Raw chart values array
  total: number; // Total of chart values
  colorScale; // D3 color provider
  pieData: any; // Arc segment parameters for current data set
  pieDataPrevious: any; // Arc segment parameters for previous data set - used for transitions
  colors = d3.scaleOrdinal(d3.schemeCategory10);

  width: number = 300;
  height: number = 250;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.countReferentialSeriesByOrigin().subscribe(data => {
      this.data = data;
      //this.buildChart();
      this.buildChartHorizontal();
    });

  }

  buildChart() {
    const margin = { top: 20, right: 20, bottom: 90, left: 120 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const svg = d3.select("#chart").append("svg")
      .attr("id", "svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    const div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Conversion des caractères en nombres
    this.data.forEach(function (d) {
      d.count = +d.count;
    });

    // Mise en relation du scale avec les données de notre fichier
    // Pour l'axe X, c'est la liste des pays
    // Pour l'axe Y, c'est le max des populations
    x.domain(this.data.map(function (d) { return d.origin; }));
    y.domain([0, d3.max(this.data, function (d) { return d.count; })]);

    // Ajout de l'axe X au SVG
    // Déplacement de l'axe horizontal et du futur texte (via la fonction translate) au bas du SVG
    // Selection des noeuds text, positionnement puis rotation
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Ajout de l'axe Y au SVG avec 6 éléments de légende en utilisant la fonction ticks (sinon D3JS en place autant qu'il peut).
    svg.append("g")
      .call(d3.axisLeft(y).ticks(6));

    // Ajout des bars en utilisant les données de notre fichier data.tsv
    // La largeur de la barre est déterminée par la fonction x
    // La hauteur par la fonction y en tenant compte de la population
    // La gestion des events de la souris pour le popup
    svg.selectAll(".bar")
      .data(this.data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.origin); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.count); })
      .attr("height", function (d) { return height - y(d.count); })
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Séries : " + d.count)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 50) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  buildChartHorizontal() {
    var width = 300,
    scaleFactor = 20,
      barHeight = 30;

    var graph = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", barHeight * this.data.length);

    var bar = graph.selectAll("g")
      .data(this.data)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
      });
    bar.append("rect").attr("width", function (d) {
      return d.count * scaleFactor;
    })

      .attr("height", barHeight - 1);

    bar.append("text")
      .attr("x", function (d) { return (d.count * scaleFactor); })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function (d) { return d.count; });
  }
}
