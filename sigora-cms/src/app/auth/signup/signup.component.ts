import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cms-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoading = false;

  onSignup(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password)

  }

}
