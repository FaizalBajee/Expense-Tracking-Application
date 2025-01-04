import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-income',
  templateUrl: './new-income.page.html',
  styleUrls: ['./new-income.page.scss'],
  standalone: false
})
export class NewIncomePage implements OnInit {

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
    // alert(this.formatDate)
    // alert(`Day: ${this.day}, Month: ${this.month}, Year: ${this.year}`)
  }

  // handleClose() {

  // }

  handleUpdate() {
    if (!this.incomeForm.valid) {
      return alert('Please will the missing field ')
    }

  }

}
