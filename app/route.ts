/**
 * Created by dd on 7/31/16.
 */
import { provideRouter, RouterConfig }  from '@angular/router';

import { IndexComponent } from './hello/index.component';
import { ItemListComponent } from './hello/item-list.component';
import { ItemDetailComponent } from './hello/item-detail.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'list',
        component: ItemListComponent
    },
    {
        path: 'detail/:id',
        component: ItemDetailComponent
    },
];

export const appRouterProviders = [
    provideRouter(routes)
];
