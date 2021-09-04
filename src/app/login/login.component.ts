import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  errorMsg= '';

  constructor(private auth: AuthService,
              private router: Router) { }

  loginForm=new FormGroup({
    Username: new FormControl(),
    Password: new FormControl()
  });

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value)
      .subscribe(
        res=>{
          console.log(res);
          let jwt=res.body.Token
          this.auth.saveToken(jwt)
          this.router.navigate(['/'])
          //location.reload();

        },
        err=>{
          console.log(err)
          //this.errorMsg=err.error.detail
          console.log(err);
        }
      )
  }

}
