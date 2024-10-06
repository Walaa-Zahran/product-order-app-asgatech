import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../shared/models/customer.model';
import { Order } from '../../shared/models/order.model';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private ordersUrl = 'assets/json/orders.json';
  private productsUrl = 'assets/json/products.json';
  private usersUrl = 'assets/json/users.json';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.usersUrl);
  }

  // Additional methods for interacting with the orders and products
  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.ordersUrl}/${orderId}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('api/orders', order);
  }

  editProductQuantity(productId: number, quantity: number): Observable<Product> {
    return this.http.put<Product>(`api/products/${productId}`, { quantity });
  }
}
