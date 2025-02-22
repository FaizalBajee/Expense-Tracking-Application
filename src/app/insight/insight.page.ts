import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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


  totalFood: number = 0;
  totalTravel: number = 0;
  totalFun: number = 0;
  totalOthers: number = 0;
  
  chartType = ChartType.PieChart;
  chartType1 = ChartType.BarChart;
  chartData: any[] = [];
  
  constructor(private service: DatabaseService) { }
  
  ionViewDidEnter() {
    this.loadChartData();
  }
  
  loadChartData() {
    this.service.getFood().subscribe((res) => {
      this.totalFood = res.total;
      this.updateChart();
    });
  
    this.service.getTravel().subscribe((res) => {
      this.totalTravel = res.total;
      this.updateChart();
    });
  
    this.service.getFun().subscribe((res) => {
      this.totalFun = res.total;
      this.updateChart();
    });
  
    this.service.getOthers().subscribe((res) => {
      this.totalOthers = res.total;
      this.updateChart();
    });
  }
  
  updateChart() {
    this.chartData = [
      ['Food', this.totalFood],
      ['Travel', this.totalTravel],
      ['Fun', this.totalFun],
      ['Others', this.totalOthers],
    ];
  }
  


}
