import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

  login(formData): Observable<any> {
    return this.httpClient.post<any>(this.loginURL, formData);
  }
}


