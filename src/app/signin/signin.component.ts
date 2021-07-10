import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  //   template: `
  //   Favorite Color: <input type="text" [formControl]="username2">
  // `,
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userDetails = new FormGroup({
    username: new FormControl(''),
    displayName: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.warn(this.userDetails.value)
  }

}
