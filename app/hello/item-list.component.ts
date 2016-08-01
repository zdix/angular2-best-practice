/**
 * Created by dd on 12/24/15.
 */
import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import {Item, ItemService}   from './item.service';

@Component({
    templateUrl: 'hello/item-list.component.html'
})

export class ItemListComponent implements OnInit 
{
    items: Item[];
    selectedItem: Item;
    
    constructor(
        private router: Router,
        private itemService: ItemService) {
    }
    
    ngOnInit() 
    {
        this.itemService.getItems().then(items => this.items = items)
    }

    onSelect(item: Item) 
    { 
        this.selectedItem = item; 
    }

    gotoDetail(item: Item) {
        this.router.navigate( ['/detail', this.selectedItem.id] );
    }
}