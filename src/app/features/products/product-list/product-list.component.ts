import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../product.service';
import { DataService } from '../../../core/services/data.service.ts.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  providers: [
    ProductService
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
    if (quantity >= 0) {
      this.dataService.editProductQuantity(product.ProductId, quantity).subscribe((updatedProduct) => {
        product.AvailablePieces = updatedProduct.AvailablePieces;
      });
    }
  }
}
