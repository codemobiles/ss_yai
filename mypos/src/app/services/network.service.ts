import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseLogin, ResponseRegister } from '../models/user.model';
import { ProductAllResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {


  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private hostURL = environment.baseAPIURL;
  private apiURL = `${this.hostURL}/api`;
  // -----------------------------------------------------
  private loginURL = `${this.apiURL}/auth/login`;
  private registerURL = `${this.apiURL}/auth/register`;
  private productURL = `${this.apiURL}/product`;
  public productImageURL = `${this.apiURL}/product/images`;
  private outOfStockURL = `${this.productURL}/count/out_of_stock`;
  private transactionURL = `${this.apiURL}/transaction`;

  constructor(private httpClient: HttpClient) {
  }

  login(formData): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.loginURL, formData);
  }

  register(formData): Observable<ResponseRegister> {
    return this.httpClient.post<ResponseRegister>(this.registerURL, formData);
  }

  getProductAll(): Observable<ProductAllResponse> {
    return this.httpClient.get<ProductAllResponse>(this.productURL);
  }
}


