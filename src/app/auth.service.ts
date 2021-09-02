import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt!: string;
  username!: string;
  roles!: Array<string>;

  public resourceUrl = environment.API_URL+"users";

  constructor(private http:HttpClient) { }
  
  /**connexion */
  login(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.resourceUrl+"/login",user,{observe:'response'})
    .pipe(catchError(this.errorHandler))
  }

  /**inscription */
  register(user: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl+"/register", user);
  }

  /**permet la gestion des erreurs */
  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }

  /**Gestion du token */
  saveToken(jwt: string){
    localStorage.setItem('token',jwt)
    // this.jwt=jwt['id_token']
    // let jwtHelper= new JwtHelperService()
    // let jwtObj=jwtHelper.decodeToken(this.jwt)
    // console.log(jwtObj)
    // this.username=jwtObj.username
    // this.roles=jwtObj.roles
  }
  

  isAuthenticated(){
    if(localStorage.getItem('token') === null)
    {
      return false
    }else{
      return true
    }
  }
  
  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
  }
  loadToken() {
    this.jwt=localStorage.getItem('token')|| '{}'
    let jwtHelper= new JwtHelperService()
    let jwtObj=jwtHelper.decodeToken(this.jwt)
    this.username=jwtObj.username
    this.roles=jwtObj.roles
  }
}
