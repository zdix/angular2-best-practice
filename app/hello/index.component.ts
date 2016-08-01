/**
 * Created by dd on 12/24/15.
 */
import { Component }   from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'app',
    template: `
    <h1>Component Router</h1>
    <a [routerLink]="['/list']">Items</a>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})
export class IndexComponent { }