import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  { path: 'orders',
     loadComponent: () =>
    import('./features/orders/order-list/order-list.component').then(
      (m) => m.OrderListComponent
    ),
   },
   { path: 'orders-details/:id',
    loadComponent: () =>
   import('./features/orders/order-details/order-details.component').then(
     (m) => m.OrderDetailsComponent
   ),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }

];
