import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast-service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: false
})
export class AccountsPage implements OnInit {
  expenseForm: FormGroup;
  date = new Date();
  year = this.date.getFullYear();
  month = String(this.date.getMonth() + 1).padStart(2, '0');
  day = String(this.date.getDate()).padStart(2, '0');

  formattedDate = `${this.year}-${this.month}-${this.day}`;

  constructor(private fb: FormBuilder, private DBservice: DatabaseService, private toastService: ToastService) {
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
      this.toastService.toast('Please fill in the missing fields')
      return;
    }
  
    const category = this.expenseForm.get("category")?.value; 
    const amount = this.expenseForm.get("amount")?.value;
    const date = this.expenseForm.get("date")?.value;
  
    this.DBservice.addSpending(category, amount, date).subscribe({
      next: (res) => {
        console.log("Response:", res);
        this.expenseForm.get("category")?.patchValue('')
        this.expenseForm.get("amount")?.patchValue('')
        this.toastService.toast('Spending record added successfully')
      },
      error: (err) => {
        console.error("Error inserting Spending:", err);
        this.toastService.toast('Failed to add Spending. Please try again.')
      },
      complete: () => console.log("Operation completed")
    });
  }



}
