/**
 * Created by dd on 12/24/15.
 */
import {Injectable} from '@angular/core';
export class Item {
    constructor(public id: number, public name: string) { }
}
@Injectable()
export class ItemService {
    getItems() { return Promise.resolve(ITEMS); }
    getItem(id: number) {
        return this.getItems()
            .then(items => items.find(item => item.id === id));
    }
}
var ITEMS = [
    new Item(11, 'Mr. Nice'),
    new Item(12, 'Narco'),
    new Item(13, 'Bombasto'),
    new Item(14, 'Celeritas'),
    new Item(15, 'Magneta'),
    new Item(16, 'RubberMan')
];
