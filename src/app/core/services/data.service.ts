import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private ordersUrl = 'assets/json/orders.json';
  private productsUrl = 'assets/json/products.json';
  private usersUrl = 'assets/json/users.json';
  private orders: Order[] = [];
  private products: Product[] = [];

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


  // Add a new order to the in-memory list
  addOrder(order: Order): Observable<Order> {
    // Assign a new ID for the order (you can adjust this logic as needed)
    const newId = this.orders.length > 0 ? Math.max(...this.orders.map(o => o.OrderId)) + 1 : 1;
    order.OrderId = newId;

    // Add the new order to the in-memory array
    this.orders.push(order);
    return of(order);
  }

  // Edit the product quantity in the in-memory list
  editProductQuantity(productId: number, quantity: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.ProductId === productId);
    if (product) {
      product.AvailablePieces = quantity;
      return of(product);
    }
    return of(undefined);
  }
}
