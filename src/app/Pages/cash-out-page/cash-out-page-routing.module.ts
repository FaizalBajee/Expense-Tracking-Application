import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashOutPagePage } from './cash-out-page.page';

const routes: Routes = [
  {
    path: '',
    component: CashOutPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashOutPagePageRoutingModule {}
