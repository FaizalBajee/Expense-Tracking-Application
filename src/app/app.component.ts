import { Component, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { ToastService } from './services/toast-service';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true })
  routerOutlet!: IonRouterOutlet;
  private lastBackPressTime = 0;
  private backPressInterval = 2000;
  constructor(private platform: Platform, private toastService: ToastService, private router: Router, private database: DatabaseService) {
    document.body.classList.remove('dark');
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.database.initializeSQLite()
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.handleBackButton();
      });
    });
  }
  async handleBackButton() {
    if (this.router.url === '/tabs/home') {
      const currentTime = new Date().getTime();
      if (currentTime - this.lastBackPressTime < this.backPressInterval) {
        App.exitApp();
      } else {
        this.toastService.toast('Press back again to exit');
        this.lastBackPressTime = currentTime;
      }
    } else {
      this.routerOutlet.pop();
    }
  }
}
