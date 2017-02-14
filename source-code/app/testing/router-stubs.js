var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, Directive, Injectable, Input } from '@angular/core';
export var RouterLinkStubDirective = (function () {
    function RouterLinkStubDirective() {
        this.navigatedTo = null;
    }
    RouterLinkStubDirective.prototype.onClick = function () {
        this.navigatedTo = this.linkParams;
    };
    __decorate([
        Input('routerLink'), 
        __metadata('design:type', Object)
    ], RouterLinkStubDirective.prototype, "linkParams", void 0);
    RouterLinkStubDirective = __decorate([
        Directive({
            selector: '[routerLink]',
            host: {
                '(click)': 'onClick()'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], RouterLinkStubDirective);
    return RouterLinkStubDirective;
}());
export var RouterOutletStubComponent = (function () {
    function RouterOutletStubComponent() {
    }
    RouterOutletStubComponent = __decorate([
        Component({ selector: 'router-outlet', template: '' }), 
        __metadata('design:paramtypes', [])
    ], RouterOutletStubComponent);
    return RouterOutletStubComponent;
}());
export var RouterStub = (function () {
    function RouterStub() {
    }
    RouterStub.prototype.navigate = function (commands, extras) { };
    RouterStub = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], RouterStub);
    return RouterStub;
}());
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export var ActivatedRouteStub = (function () {
    function ActivatedRouteStub() {
        // ActivatedRoute.params is Observable
        this.subject = new BehaviorSubject(this.testParams);
        this.params = this.subject.asObservable();
    }
    Object.defineProperty(ActivatedRouteStub.prototype, "testParams", {
        get: function () { return this._testParams; },
        set: function (params) {
            this._testParams = params;
            this.subject.next(params);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteStub.prototype, "snapshot", {
        // ActivatedRoute.snapshot.params
        get: function () {
            return { params: this.testParams };
        },
        enumerable: true,
        configurable: true
    });
    ActivatedRouteStub = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], ActivatedRouteStub);
    return ActivatedRouteStub;
}());
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */ 
//# sourceMappingURL=router-stubs.js.map