import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private networkService: NetworkService, private router: Router) { }

  ngOnInit() {
  }

  login(ngForm : NgForm){
      this.networkService.login(ngForm.value).subscribe(
        data => {
          this.router.navigate(["/stock"]);
        }
      );
  }

}
