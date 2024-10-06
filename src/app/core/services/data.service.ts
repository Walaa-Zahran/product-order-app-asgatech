import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
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
  private ordersCache: Order[] = [];

  constructor(private http: HttpClient) {

  }

  getOrders(): Observable<Order[]> {
    // If ordersCache is not empty, return the cached data
    if (this.ordersCache.length) {
      return of(this.ordersCache);
    }

    // Otherwise, fetch data from JSON file and store in cache
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      tap((orders) => {
        this.ordersCache = orders;
        console.log('Fetched Orders:', this.ordersCache); // This will log the JSON data
      }),
      shareReplay(1) // Cache the observable so future subscriptions don't trigger a new HTTP request
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((products) => {
        this.products = products;
        console.log('Fetched products:', this.products); // This will log the JSON data
      }),
      shareReplay(1) // Cache the observable so future subscriptions don't trigger a new HTTP request;
); }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.usersUrl);
  }

  // Additional methods for interacting with the orders and products
  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.ordersUrl}`);
  }


  // Add a new order to the in-memory list
  addOrder(order: Order): Observable<Order> {
    // Assign a new ID for the order
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
