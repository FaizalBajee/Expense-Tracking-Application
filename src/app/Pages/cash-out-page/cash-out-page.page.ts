import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      cetegory: ['', Validators.required],
      amount: ['', Validators.required],
      date: [this.formattedDate]
    })
  }

  ngOnInit() {
  }

  // handleClose() {

  // }

  handleUpdate() {
    if (!this.expenseForm.valid) {
      alert('Please will the missing field ')
    }
  }



}
