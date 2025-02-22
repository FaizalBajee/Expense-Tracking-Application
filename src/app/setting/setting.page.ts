import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast-service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: false,
})
export class SettingPage implements OnInit {
  incomeForm: FormGroup;
  date = new Date();
  year = this.date.getFullYear();
  month = String(this.date.getMonth() + 1).padStart(2, '0');
  day = String(this.date.getDate()).padStart(2, '0');

  formattedDate = `${this.year}-${this.month}-${this.day}`;

  constructor(private fb: FormBuilder, private DBservice: DatabaseService, private route: Router, private toastService: ToastService) {
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
      this.toastService.toast('Please fill in the missing fields')
      return;
    }

    const category = this.incomeForm.get("category")?.value;
    const amount = this.incomeForm.get("amount")?.value;
    const date = this.incomeForm.get("date")?.value;

    this.DBservice.addIncome(category, amount, date).subscribe({
      next: (res) => {
        console.log("Response:", res);
        this.incomeForm.get("category")?.patchValue('');
        this.incomeForm.get("amount")?.patchValue('');
        this.toastService.toast('Income record added successfully');
        
      },
      error: (err) => {
        console.error("Error inserting income:", err);
        this.toastService.toast('Failed to add income. Please try again.')
      },
      complete: () => console.log("Operation completed")
    });
  }


}
