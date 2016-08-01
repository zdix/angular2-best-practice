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
var router_1 = require('@angular/router');
var item_service_1 = require('./item.service');
var ItemListComponent = (function () {
    function ItemListComponent(router, itemService) {
        this.router = router;
        this.itemService = itemService;
    }
    ItemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemService.getItems().then(function (items) { return _this.items = items; });
    };
    ItemListComponent.prototype.onSelect = function (item) {
        this.selectedItem = item;
    };
    ItemListComponent.prototype.gotoDetail = function (item) {
        this.router.navigate(['/detail', this.selectedItem.id]);
    };
    ItemListComponent = __decorate([
        core_1.Component({
            templateUrl: 'hello/item-list.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, item_service_1.ItemService])
    ], ItemListComponent);
    return ItemListComponent;
}());
exports.ItemListComponent = ItemListComponent;
