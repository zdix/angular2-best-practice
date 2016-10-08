/**
 * Created by dd on 7/31/16.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { IndexComponent } from './index.component';
import { ItemListComponent } from './item-list.component';
import { ItemDetailComponent } from './item-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'list', component: ItemListComponent },
    { path: 'detail/:id', component: ItemDetailComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
