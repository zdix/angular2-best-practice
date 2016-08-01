"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by dd on 12/24/15.
 */
var core_1 = require('@angular/core');
var Item = (function () {
    function Item(id, name) {
        this.id = id;
        this.name = name;
    }
    return Item;
}());
exports.Item = Item;
var ItemService = (function () {
    function ItemService() {
    }
    ItemService.prototype.getItems = function () { return Promise.resolve(ITEMS); };
    ItemService.prototype.getItem = function (id) {
        return this.getItems()
            .then(function (items) { return items.find(function (item) { return item.id === id; }); });
    };
    ItemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
var ITEMS = [
    new Item(11, 'Mr. Nice'),
    new Item(12, 'Narco'),
    new Item(13, 'Bombasto'),
    new Item(14, 'Celeritas'),
    new Item(15, 'Magneta'),
    new Item(16, 'RubberMan')
];
