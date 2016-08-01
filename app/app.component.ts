/**
 * Created by dd on 7/31/16.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ItemService } from './hello/item.service';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ItemService
    ]
})
export class AppComponent {
    title = 'Tour of Heroes';
}
