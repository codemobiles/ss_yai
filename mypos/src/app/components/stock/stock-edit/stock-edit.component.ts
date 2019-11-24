import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})

export class StockEditComponent implements OnInit {

  mProduct: Product

  imageSrc: ArrayBuffer | string = null;

  mIsSubmitted = false;

  constructor(private networkService: NetworkService, private activateRoute: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      params => {
        this.feedData(params.id)
      }
    );
  }

  feedData(id: any) {
    this.networkService.getProduct(id).subscribe(
      data => {
          data.result.image = `${this.networkService.productImageURL}/${data.result.image}`
          this.mProduct = data.result
      }
    )
  }

  submit(){
    console.log(this.mProduct.image.toString());

    this.networkService.editProduct(this.mProduct, this.mProduct.productId).subscribe(
      data => {
         this.mIsSubmitted = true;
         this.location.back()
      }
    )
  }

  setImage(event){
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result; //ui
        this.mProduct.image = metaImage; //bl
      };
    }
  }

  cancel(){
    this.location.back()
  }


}
