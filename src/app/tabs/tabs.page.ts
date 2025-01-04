import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  menuOpen = false;

  constructor() {}
  
  onAddClick(){
    this.menuOpen = !this.menuOpen;
  }


  onNewIncome() {
    console.log('New Income');
  }

  onNewExpense() {
    console.log('New Expense');
  }

}
