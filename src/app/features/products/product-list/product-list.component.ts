import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../product.service';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => this.products = data,
      (error) => console.error('Failed to load products', error)
    );
  }
}
