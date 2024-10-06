import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { Customer } from '../../../core/models/customer.model';
import { Order } from '../../../core/models/order.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  orders: Order[] = [];
  customers: Customer[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });

    this.dataService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  getCustomerName(userId: string): string {
    const customer = this.customers.find(c => c.Id === userId);
    return customer ? customer.Name : 'Unknown Customer';
  }
}
