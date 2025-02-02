import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { ChartService } from '../services/chart.service';
import { ViewDidEnter } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.page.html',
  styleUrls: ['./insight.page.scss'],
  standalone: false
})
export class InsightPage implements ViewDidEnter {

  constructor(private chartService: ChartService, private service: DatabaseService) { }

  ionViewDidEnter() {
    this.chartService.getFood().subscribe((res) => {
      console.log("ressss : ", res)
    })
  }

  chartType = ChartType.PieChart;
  chartData = [
    ['Food', 3000],
    ['Travel', 2000],
    ['Friends', 2000],
    ['Entertainment', 2000],
    ['Other', 500],
  ];

}
