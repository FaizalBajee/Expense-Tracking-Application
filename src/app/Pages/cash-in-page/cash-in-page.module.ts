import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CashInPagePageRoutingModule } from './cash-in-page-routing.module';

import { CashInPagePage } from './cash-in-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashInPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CashInPagePage]
})
export class CashInPagePageModule {}
