import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private auth: AuthService) { }
  users: any=[];

  isLogin =this.auth.isAuthenticated()

  ngOnInit(): void {
    if (this.isLogin) {
      this.refreshList();

    } else {
      this.auth.logout()
    }
    this.refreshList();
  }
  refreshList(){
    this.auth.getUsers().subscribe(
      res=>{
        console.log(res);
        this.users=res;
        console.log(this.users);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
