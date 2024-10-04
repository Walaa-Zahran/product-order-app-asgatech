import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './features/orders/order-details/order-details.component';

export const routes: Routes = [
  {  path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  { path: 'orders', component: OrderListComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }

];
