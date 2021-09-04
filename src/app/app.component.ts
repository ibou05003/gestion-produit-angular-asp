import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion de produits';
  collapsed = true;

  constructor(private auth: AuthService) { }
  isLogin =this.auth.isAuthenticated()
  ngOnInit(): void {
    console.log(this.isLogin)
  }
  logout(){
    this.auth.logout()
  }
}
