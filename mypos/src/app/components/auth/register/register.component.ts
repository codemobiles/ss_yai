import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  position = ['Admin', 'Cashier']

  // DI
  constructor(private location: Location, private networkService: NetworkService) {}
   // don't forget import { Location } from '@angular/common';

  ngOnInit() {
  }

  submit(ngForm: NgForm){
    this.networkService.register(ngForm.value).subscribe(
      data => {
          this.location.back();
      },
      error => {
        alert(error);
      }
    );
  }


  cancel(){
    this.location.back()
  }

}
