/**
 * Created by dd on 12/24/15.
 */
import { Component,  OnInit, OnDestroy }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item, ItemService }   from './item.service';

@Component({
    templateUrl: 'hello/item-detail.component.html',
})
export class ItemDetailComponent implements OnInit, OnDestroy  
{
    item: Item;
    sub: any;

    constructor(
        private route:ActivatedRoute,
        private service:ItemService){
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.service.getItem(id).then(item => this.item = item);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBack() {
        window.history.back();
    }
}