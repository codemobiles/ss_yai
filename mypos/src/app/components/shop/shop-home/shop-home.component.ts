import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})
export class ShopHomeComponent implements OnInit {

  mProductArray = new Array<Product>();
  mOrderArray = new Array<Product>();
  mTotalPrice = 0;
  mIsPaymentShow = false;

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.feedData()
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        // console.log(JSON.stringify(data.result));

        this.mProductArray = data.result.map(
          item => {
            var image = item.image;
            if (image != null && image != '') {
              item.image = this.networkService.productImageURL + "/" + item.image
            }
            return item
          }
        )
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  onClickAddOrder(item: Product, isDecrease: Boolean) {
    const foundIndex = this.mOrderArray.indexOf(item);

    if (foundIndex === -1) {
      item.qty = 1;
      this.mOrderArray.unshift(item);
    } else {
      if(isDecrease){
        if(item.qty > 1){
          item.qty--;
        }
      }else{
        item.qty++;
      }
    }
    this.sumPrice();
  }

  sumPrice(){
    this.mTotalPrice = 0;
    for (const item of this.mOrderArray) {
      this.mTotalPrice += item.price * item.qty;
    }
  }

  removeOrder(item: Product){
    this.mProductArray.map(data => {
      if (item.productId === data.productId) {
        data.qty = null;
      }
    });

    this.mOrderArray.splice(this.mOrderArray.indexOf(item), 1);
    this.sumPrice();

    if (this.mTotalPrice === 0 && this.mIsPaymentShow === true) {
      this.mIsPaymentShow = !this.mIsPaymentShow;
    }
  }

  isSelectedItem(item: Product) {
    return this.mOrderArray.indexOf(item) === -1 ? false : true;
  }

  paymentSumbit(){
    if (this.mTotalPrice > 0) {
      this.mIsPaymentShow = !this.mIsPaymentShow;
    } else {
      alert('At least single order is requied!');
    }
  }

  clearOrder(){
    this.mProductArray = [];
    this.mOrderArray = [];
    this.mTotalPrice = 0;
    this.mIsPaymentShow = false;

    this.feedData();
  }

  getDataTest(event){
    alert(event)
  }

}
