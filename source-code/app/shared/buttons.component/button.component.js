var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var ButtonRaised = (function () {
    function ButtonRaised() {
    }
    return ButtonRaised;
}());
__decorate([
    Input('raised-button-name'),
    __metadata("design:type", String)
], ButtonRaised.prototype, "name", void 0);
ButtonRaised = __decorate([
    Component({
        selector: 'raised-button',
        template: " <button md-raised-button class=\"r-brn\">{{ name }}</button>",
        styles: [".r-brn {background-color: #e6e6e6;} .r-brn:hover {background-color: #cdcdcd;}"],
    })
], ButtonRaised);
export { ButtonRaised };
var ButtonFlat = (function () {
    function ButtonFlat() {
    }
    return ButtonFlat;
}());
__decorate([
    Input('raised-button-name'),
    __metadata("design:type", String)
], ButtonFlat.prototype, "name", void 0);
ButtonFlat = __decorate([
    Component({
        selector: 'flat-button',
        template: " <button md-button class=\"r-brn\">{{ name }}</button>",
        styles: [".r-brn {background-color: #e6e6e6;} .r-brn:hover {background-color: #cdcdcd;}"],
    })
], ButtonFlat);
export { ButtonFlat };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=button.component.js.map