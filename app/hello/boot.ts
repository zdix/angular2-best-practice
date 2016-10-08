import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { Component }      from "@angular/core";
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { AppRoutingModule } from './route';

import {ItemService} from "./item.service";

import { IndexComponent } from './index.component'
import { ItemListComponent } from './item-list.component'
import { ItemDetailComponent } from './item-detail.component'

@Component({
    selector: 'app',
    template: `
    <h1>{{title}}</h1>
    <router-outlet></router-outlet>
  `,
})
class AppComponent {
    constructor() {}
}

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        ItemListComponent,
        ItemDetailComponent
    ],
    providers: [
        ItemService
    ],
    bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);