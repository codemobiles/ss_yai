import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
  }

  login(ngForm : NgForm){
      this.networkService.login(ngForm.value).subscribe(
        data => {
          console.log(data);
        }
      );
  }

}
