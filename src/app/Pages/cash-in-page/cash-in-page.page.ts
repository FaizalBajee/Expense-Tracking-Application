import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.incomeForm = this.fb.group({
      cetegory: ['', Validators.required],
      amount: ['', Validators.required],
      date: [this.formattedDate]
    })
  }

  ngOnInit() {
  }

  handleUpdate() {
    if (!this.incomeForm.valid) {
      return alert('Please will the missing field ')
    }

  }


}
