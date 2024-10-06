import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../core/models/customer.model';
import { Order } from '../../../core/models/order.model';
import { Product } from '../../../core/models/product.model';
import { DataService } from '../../../core/services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  order: Order | undefined;
  products: Product[] = [];
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  // Load the order details based on the route parameter
  private loadOrderDetails(): void {
    // Get the orderId from the route
    const orderId = +this.route.snapshot.paramMap.get('id')!;

    // Load the order, products, and customer data
    this.dataService.getOrder(orderId).subscribe((order) => {
      this.order = order;

      // Load the products in the order
      this.dataService.getProducts().subscribe((products) => {
        this.products = products.filter((p) =>
          this.order?.Products.some(op => op.ProductId === p.ProductId)
        );
      });

      // Load the customer details
      this.dataService.getCustomers().subscribe((customers) => {
        this.customer = customers.find(c => c.Id === this.order?.UserId);
      });
    });
  }

  // Get the product quantity in the order
  getProductQuantity(productId: number): number {
    return this.order?.Products.find(p => p.ProductId === productId)?.Quantity || 0;
  }

  // Calculate the total price for the order
  calculateTotalOrderPrice(): number {
    let totalPrice = 0;
    if (this.order) {
      for (const orderProduct of this.order.Products) {
        const product = this.products.find(p => p.ProductId === orderProduct.ProductId);
        if (product) {
          totalPrice += product.ProductPrice * orderProduct.Quantity;
        }
      }
    }
    return totalPrice;
  }
}
