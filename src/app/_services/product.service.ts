import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Product } from '../_model/product.model';
import { StringResult } from '../_model/stringResult';
import { Report } from '../_model/report';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public createTransaction(amount) {
    return this.httpClient.get("https://determined-caring-production.up.railway.app/createTransaction/"+amount);
  }

  public markAsDelivered(orderId) {
      return this.httpClient.get("https://determined-caring-production.up.railway.app/markOrderAsDelivered/"+orderId)
  }

  public getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("https://determined-caring-production.up.railway.app/getAllOrderDetails/"+status);
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("https://determined-caring-production.up.railway.app/getOrderDetails");
  }

  public deleteCartItem(cartId) {
    return this.httpClient.delete("https://determined-caring-production.up.railway.app/deleteCartItem/"+cartId);
  }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("https://determined-caring-production.up.railway.app/addNewProduct", product);
  }

  public getAllProducts(pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>("https://determined-caring-production.up.railway.app/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getProductDetailsById(productId) {
    return this.httpClient.get<Product>("https://determined-caring-production.up.railway.app/getProductDetailsById/"+productId);
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete("https://determined-caring-production.up.railway.app/deleteProductDetails/"+productId);
  }

  public getProductDetails(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>("https://determined-caring-production.up.railway.app/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout) {
    return this.httpClient.post("https://determined-caring-production.up.railway.app/placeOrder/"+isCartCheckout, orderDetails);
  }

  public addToCart(productId) {
    return this.httpClient.get("https://determined-caring-production.up.railway.app/addToCart/"+productId);
  }

  public getCartDetails() {
    return this.httpClient.get("https://determined-caring-production.up.railway.app/getCartDetails");
  }

  public printProduct = (report: Report): Observable<StringResult> => {
    const data = JSON.stringify(report);
    return this.httpClient.post<StringResult>("https://determined-caring-production.up.railway.app/printProduct", data, {
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      })
    });
  }
}
