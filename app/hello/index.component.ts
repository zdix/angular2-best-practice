/**
 * Created by dd on 12/24/15.
 */
import { Component }   from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <h1>Component Router</h1>
    <a [routerLink]="['/list']">Items</a>
    <router-outlet></router-outlet>
  `,
})
export class IndexComponent { }