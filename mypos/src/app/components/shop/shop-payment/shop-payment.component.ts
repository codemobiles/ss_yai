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

  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.submitPayments.emit()
    this.testSendData.emit("tanakorn")
  }

}
