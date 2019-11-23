import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogin(){
    const token = localStorage.getItem(environment.keyLocalAuthenInfo)
    return token !== null && token !== ""
  }

  logout(){
    localStorage.clear()
    // localStorage.removeItem("xxxxxx")
  }
}
