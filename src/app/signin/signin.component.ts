import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/backend.service';

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
    username: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required)
  })

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    //console.warn(this.userDetails.get('username')?.value)
    const userid = this.userDetails.get('username')!.value as string
    const name = this.userDetails.get('displayName')!.value as string
    const response = this.backendService.connect({ id: userid, name: name })
    if (response.isSuccess) {
      alert("Yahh I'am in")
    }
  }

}
