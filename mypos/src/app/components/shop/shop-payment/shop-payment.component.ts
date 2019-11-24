import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shop-payment',
  templateUrl: './shop-payment.component.html',
  styleUrls: ['./shop-payment.component.css']
})
export class ShopPaymentComponent implements OnInit {

  @Input("total") totalPayment: number
  @Input("order") orderPayment: string
  @Output("submit") submitPayments = new EventEmitter<void>()
  @Output("test_send") testSendData = new EventEmitter<String>()

  givenNumber = '0.00'

  public get isPaidEnough(){
    var given = Number(this.givenNumber);
    if (given > 0 && given >= this.totalPayment) {
      return true;
    }
    return false;
  }

  onClickExact() {
    this.givenNumber = String(this.totalPayment);
  }

  onClickGiven(addGiven: number) {
    this.givenNumber = String(Number(this.givenNumber) + addGiven + '.00');
  }

  onClickReset() {
    this.givenNumber = '0.00';
  }

  public get mChange(){
    const cash = Number(this.givenNumber.replace(/,/g, ''));
    const result = cash - this.totalPayment;
    if (result >= 0) {
      return result;
    } else {
      return 0;
    }
  }



  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.submitPayments.emit()
    this.testSendData.emit("tanakorn")
  }

}
