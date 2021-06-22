import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

const preloadEnabled = false;
const routingConfig = preloadEnabled ? { preloadingStrategy: PreloadAllModules } : {};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
