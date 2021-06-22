# angular-modules-lazy-loading

Setup lazy loading for routed components

## Step by step

### Create new feature modules

Create Customer module using CLI

```
ng generate module customers --route customers --module app.module
```

Create Orders module using CLI

```
ng generate module orders --route orders --module app.module
```

The commands above will auto register routes like below, with `loadChildren` implementation using native ESM dynamic imports syntax.

```ts
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
```

### Add router links

```html
<h1>
  {{title}}
</h1>

<button routerLink="/customers">Customers</button>
<button routerLink="/orders">Orders</button>
<button routerLink="">Home</button>

<router-outlet></router-outlet>
```

### Checkout lazy load in action

```
ng serve
```

or 

```
yarn start
```

Checkout it's behaviour by navigating on http://localhost:4200

Notice JavaScript chunks being fetched while routing by looking into network inspection of browser's devtools. It also contains components styles that will be injected in the DOM.

### Bonus: Pre-loading strategy

You can also configure to automatically pre load modules to improve user experience by setting the strategy on routing module. This prevent users to have to wait for files to be downloaded when routed.

```ts
import { PreloadAllModules } from '@angular/router';

RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});
```

## References

- [Lazy-loading feature modules](https://angular.io/guide/lazy-loading-ngmodules)
