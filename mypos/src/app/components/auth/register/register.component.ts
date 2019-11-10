import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  position = ['Admin', 'Cashier']


  // DI
  constructor(private location: Location) {

   }
   // don't forget import { Location } from '@angular/common';

  ngOnInit() {
  }

  submit(ngForm: NgForm){
    alert(JSON.stringify(ngForm.value))
  }


  cancel(){
    this.location.back()
  }

}
