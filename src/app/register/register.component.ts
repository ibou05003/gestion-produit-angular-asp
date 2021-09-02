import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMsg= '';

  constructor(private auth: AuthService,
              private router: Router) { }

  registerForm=new FormGroup({
    FirstName: new FormControl(),
    LastName: new FormControl(),
    Username: new FormControl(),
    Password: new FormControl()
  });

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm.value);
    this.auth.register(this.registerForm.value)
      .subscribe(
        res=>{
          console.log(res);
          this.router.navigate(['/login'])
        },
        err=>{
          console.log(err)
          //this.errorMsg=err.error.detail
          console.log(err);
        }
      )
  }

}
