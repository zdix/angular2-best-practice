import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Component } from "@angular/core";

import { appRouterProviders } from './route';
import {ItemService} from "./hello/item.service";

@Component({
    selector: 'app',
    template: `
    <h1>{{title}}</h1>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ItemService
    ]
})
class AppComponent {
    constructor() {}
}

bootstrap(AppComponent, [
    appRouterProviders
]);
