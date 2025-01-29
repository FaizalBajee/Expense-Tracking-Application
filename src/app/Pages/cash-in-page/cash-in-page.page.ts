import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cash-in-page',
  templateUrl: './cash-in-page.page.html',
  styleUrls: ['./cash-in-page.page.scss'],
  standalone: false
})
export class CashInPagePage implements OnInit {
  incomeForm: FormGroup;
  date = new Date();
  year = this.date.getFullYear();
  month = String(this.date.getMonth() + 1).padStart(2, '0');
  day = String(this.date.getDate()).padStart(2, '0');

  formattedDate = `${this.year}-${this.month}-${this.day}`;

  constructor(private fb: FormBuilder, private DBservice: DatabaseService) {
    this.incomeForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', Validators.required],
      date: [this.formattedDate]
    })
  }

  ngOnInit() {
  }

  handleUpdate() {
    if (!this.incomeForm.valid) {
      alert('Please fill in the missing fields'); // Fixed typo
      return;
    }
  
    const category = this.incomeForm.get("category")?.value; 
    const amount = this.incomeForm.get("amount")?.value;
    const date = this.incomeForm.get("date")?.value;
  
    this.DBservice.addIncome(category, amount, date).subscribe({
      next: (res) => {
        console.log("Response:", res);
        alert('Income record added successfully');
      },
      error: (err) => {
        console.error("Error inserting income:", err);
        alert('Failed to add income. Please try again.');
      },
      complete: () => console.log("Operation completed")
    });
  }
  


}
