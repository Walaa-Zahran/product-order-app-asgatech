import { Component } from '@angular/core';
import { Order } from '../../../core/models/order.model';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../core/models/customer.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  orders: Order[] = [];
  selectedOrder: Order | undefined;
  productsInOrder: (Product & { Quantity: number })[] = [];
  customer: Customer | undefined;

  constructor(private orderService: DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id')!;

    // Example: Get all orders
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log('All Orders:', orders);
    });

    // Example: Get order by ID
    this.orderService.getOrder(orderId).subscribe(order => {
      this.selectedOrder = order;
    });

    // Example: Get products for an order
    this.orderService.getProductsByOrderId(orderId).subscribe(products => {
      this.productsInOrder = products;
    });

    // Example: Get customer details for an order
    this.orderService.getCustomerByOrder(orderId).subscribe(customer => {
      this.customer = customer;
    });
  }
  // Get the product quantity in the order
  getProductQuantity(productId: number): number {
    return this.selectedOrder?.Products.find(p => p.ProductId === productId)?.Quantity || 0;
  }
 // Calculate the total price for the order
 calculateTotalOrderPrice(): number {
  let totalPrice = 0;
  if (this.selectedOrder) {
    for (const orderProduct of this.selectedOrder.Products) {
      const product = this.productsInOrder.find(p => p.ProductId === orderProduct.ProductId);
      if (product) {
        totalPrice += product.ProductPrice * orderProduct.Quantity;
      }
    }
  }
  return totalPrice;
}
}
