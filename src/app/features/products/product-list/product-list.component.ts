import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  providers: [
    DataService
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  isLowStock(product: Product): boolean {
    return product.AvailablePieces < 5;
  }
  editProductQuantity(product: Product, quantity: number): void {
    // Ensure the quantity is not negative
    if(quantity>=0){
      const prd = this.products.find((p) => p.ProductId === product.ProductId);

      if (prd ) {
        prd.AvailablePieces=quantity;
      }
    }

  }

}
