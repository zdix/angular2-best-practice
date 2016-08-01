"use strict";
/**
 * Created by dd on 7/31/16.
 */
var router_1 = require('@angular/router');
var index_component_1 = require('./hello/index.component');
var item_list_component_1 = require('./hello/item-list.component');
var item_detail_component_1 = require('./hello/item-detail.component');
var routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: index_component_1.IndexComponent
    },
    {
        path: 'list',
        component: item_list_component_1.ItemListComponent
    },
    {
        path: 'detail/:id',
        component: item_detail_component_1.ItemDetailComponent
    },
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
