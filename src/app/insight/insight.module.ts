import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsightPageRoutingModule } from './insight-routing.module';

import { InsightPage } from './insight.page';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsightPageRoutingModule,
    GoogleChartsModule
  ],
  declarations: [InsightPage]
})
export class InsightPageModule {}
