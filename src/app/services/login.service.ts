import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  //generamos el token
  public generateToken(loginData : any, user :string, password : string){
    return this.http.post(`${baseUrl}/generate-token/${user}/${password}`,null)
  }

  //iniciamos sesion y establecemos el token en el local storage
  public loginUser(token :any){
    localStorage.setItem('token',token);
  }

  public isLoggenIn(){
    if (!localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  //Cerramos sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenermos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user : any){
    localStorage.setItem('user' , JSON.stringify(user));
  }

  public getUser(){
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')!);
    }else {
      this.logout();
    }
  }

  public getUserRole(){
    return this.getUser().authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }
}
