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

  constructor(private chartService: ChartService, private service: DatabaseService) { }

  ionViewDidEnter() {
    this.foodFunc();
    this.travelFunc();
    this.funFunc();
    this.othersFunc();
  }

  foodFunc() {
    this.service.getFood().subscribe((res) => {
      this.totalFood = res.total;
      console.log("Food spending: ", this.totalFood);
    });
  }
  travelFunc() {
    this.service.getTravel().subscribe((res) => {
      this.totalTravel = res.total;
      console.log("travel spending: ", this.totalTravel);
    });
  }
  funFunc() {
    this.service.getFun().subscribe((res) => {
      this.totalFun = res.total;
      console.log("Fun spending: ", this.totalFun);
    });
  }
  othersFunc() {
    this.service.getOthers().subscribe((res) => {
      this.totalOthers = res.total;
      console.log("others spending: ", this.totalOthers);
    });
  }



  chartType = ChartType.PieChart;
  chartData = [
    ['Food', this.totalFood],
    ['Travel', this.totalTravel],
    ['Fun', this.totalFun],
    ['Others', this.totalOthers],
  ];


}
