import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private networkService: NetworkService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLogin()){
      this.router.navigate(["/stock"])
    }
  }

  login(ngForm : NgForm){
      this.networkService.login(ngForm.value).subscribe(
        data => {
          localStorage.setItem(environment.keyLocalAuthenInfo, data.token);
          this.router.navigate(["/stock"]);
        }
      );
  }

}
