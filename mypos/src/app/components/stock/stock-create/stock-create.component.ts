import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct: Product = new Product()

  imageSrc: ArrayBuffer | string = null;

  constructor(private networkService: NetworkService,
    private location: Location) {

  }

  ngOnInit() {
  }

  submit(){
    this.networkService.addProduct(this.mProduct).subscribe(
      data => {
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
