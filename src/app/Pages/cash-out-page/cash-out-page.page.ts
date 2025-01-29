import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-cash-out-page',
  templateUrl: './cash-out-page.page.html',
  styleUrls: ['./cash-out-page.page.scss'],
  standalone:false
})
export class CashOutPagePage implements OnInit {
  expenseForm: FormGroup;
  date = new Date();
  year = this.date.getFullYear();
  month = String(this.date.getMonth() + 1).padStart(2, '0');
  day = String(this.date.getDate()).padStart(2, '0');

  formattedDate = `${this.year}-${this.month}-${this.day}`;

  constructor(private fb: FormBuilder, private DBservice: DatabaseService) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', Validators.required],
      date: [this.formattedDate]
    })
  }

  ngOnInit() {
  }

  handleUpdate() {
    if (!this.expenseForm.valid) {
      alert('Please fill in the missing fields'); // Fixed typo
      return;
    }
  
    const category = this.expenseForm.get("category")?.value; 
    const amount = this.expenseForm.get("amount")?.value;
    const date = this.expenseForm.get("date")?.value;
  
    this.DBservice.addSpending(category, amount, date).subscribe({
      next: (res) => {
        console.log("Response:", res);
        alert('Spending record added successfully'); 
      },
      error: (err) => {
        console.error("Error inserting Spending:", err);
        alert('Failed to add Spending. Please try again.'); 
      },
      complete: () => console.log("Operation completed")
    });
  }



}
