import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements ViewDidEnter {

  constructor(private DBservice: DatabaseService) {
    console.log("constructor ")
  }

  incomeTotal!: number;

  spendingTotal!: number;

  balanceTotal!: number;

  ionViewDidEnter() {
    console.log("lifecyle ")
    this.TotalIncome();
    this.TotalSpending();
    this.calculateBalance();

  }

  TotalIncome() {
    this.DBservice.getTotalIncome().subscribe({
      next: (res) =>
        console.log('Total Income:', res.total,
          this.incomeTotal = res.total,
          this.balanceTotal = res.total
        ),
      error: (err) => console.error('Error:', err),
    });
  }

  TotalSpending() {
    this.DBservice.getTotalSpending().subscribe({
      next: (res) =>
        console.log('Total Spending:', res.total,
          this.spendingTotal = res.total
        ),
      error: (err) => console.error('Error:', err),
    });
  }

  calculateBalance() {
    this.balanceTotal = this.balanceTotal - this.spendingTotal;
    console.log('Balance:11111111', this.balanceTotal);
  }


}
