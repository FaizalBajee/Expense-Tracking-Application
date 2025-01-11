import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'insight',
    loadChildren: () => import('./insight/insight.module').then(m => m.InsightPageModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsPageModule)
  },
  {
    path: 'cash-in-page',
    loadChildren: () => import('./Pages/cash-in-page/cash-in-page.module').then(m => m.CashInPagePageModule)
  },
  {
    path: 'cash-out-page',
    loadChildren: () => import('./Pages/cash-out-page/cash-out-page.module').then(m => m.CashOutPagePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
