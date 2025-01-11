import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CashOutPagePageRoutingModule } from './cash-out-page-routing.module';

import { CashOutPagePage } from './cash-out-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashOutPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CashOutPagePage]
})
export class CashOutPagePageModule {}
