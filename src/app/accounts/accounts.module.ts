import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AccountsPageRoutingModule } from './accounts-routing.module';

import { AccountsPage } from './accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AccountsPage]
})
export class AccountsPageModule {}
