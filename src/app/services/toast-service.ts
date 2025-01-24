import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) { }
  async toast(message: any) {
    const toasts = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom"
    })
    await toasts.present()
  }

}