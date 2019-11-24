import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseLogin, ResponseRegister } from '../models/user.model';
import { ProductAllResponse, Product, ProductResponse } from '../models/product.model';

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

  getProduct(id: number): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${this.productURL}/${id}`);
  }

  deleteProduct(id: number): Observable<ProductAllResponse> {
    return this.httpClient.delete<ProductAllResponse>(`${this.productURL}/${id}`);
  }

  addProduct(product: Product): Observable<ProductAllResponse> {
    return this.httpClient.post<ProductAllResponse>(this.productURL, this.makeFormData(product));
  }

  editProduct(product: Product, id: number): Observable<ProductAllResponse> {
    return this.httpClient.put<ProductAllResponse>(`${this.productURL}/${id}`, this.makeFormData(product));
  }

  makeFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', `${product.price}`);
    formData.append('stock', `${product.stock}`);
    formData.append('upload_file', product.image);
    return formData;
  }

  getProductImage(name: string): Observable<Blob> {
    return this.httpClient.get(`${this.productImageURL}/${name}`, { responseType: 'blob' });
  }
}


