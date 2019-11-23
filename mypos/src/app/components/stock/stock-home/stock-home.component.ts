import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray: Product[]
  mSearchArray: Product[]

  // RX Reactive programming
  searchTextChanged = new Subject<string>();

  constructor(private networkService: NetworkService, private router: Router) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(500)
    ).subscribe(result => {
      this.searchProduct(result);
    })
    this.feedData()
  }

  searchProduct(result: string) {
    this.mDataArray = this.mSearchArray.filter(
      item => {
        return item.name.toLowerCase().indexOf(result.toLowerCase()) > -1
      }
    )
  }

  getStockProduct(): Number {
    return this.mDataArray.filter(
      item => {
        if (item.stock === 0) {
          return item
        }
      }
    ).length
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        this.mDataArray = data.result.map(item => {
          item.image = `${this.networkService.productImageURL}/${item.image}`
          return item
        })

        this.mSearchArray = this.mDataArray
      }
    );
  }

  edit(id: Number) {
    this.router.navigate([`stock/edit/${id}`]);
  }

  delete(id: number) {
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
        this.networkService.deleteProduct(id).subscribe(
          data => {
            this.feedData()
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          },
          error => {
            Swal.fire(
              'Deleted failure',
              error,
              'error'
            )
          }
        );
      }
    })
  }

}
