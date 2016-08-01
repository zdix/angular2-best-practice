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
var ItemDetailComponent = (function () {
    function ItemDetailComponent(route, service) {
        this.route = route;
        this.service = service;
    }
    ItemDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.service.getItem(id).then(function (item) { return _this.item = item; });
        });
    };
    ItemDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ItemDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    ItemDetailComponent = __decorate([
        core_1.Component({
            templateUrl: 'hello/item-detail.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, item_service_1.ItemService])
    ], ItemDetailComponent);
    return ItemDetailComponent;
}());
exports.ItemDetailComponent = ItemDetailComponent;
