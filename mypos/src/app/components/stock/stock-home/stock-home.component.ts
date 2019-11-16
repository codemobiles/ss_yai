import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray = [11,22,33,44,55,66,77]

  // RX Reactive programming
  searchTextChanged = new Subject<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(5000)
    ).subscribe( result => {
      console.log(result);
    })
  }

  edit(id: Number){
    this.router.navigate([`stock/edit/${id}`]);
  }

  delete(id: Number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        // send to webapi
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
