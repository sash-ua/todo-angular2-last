var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter, Input } from '@angular/core';
var ModalWindowComponent = (function () {
    function ModalWindowComponent() {
        this.dataItemVisibility = new EventEmitter();
    }
    return ModalWindowComponent;
}());
__decorate([
    Input('data-messages'),
    __metadata("design:type", String)
], ModalWindowComponent.prototype, "message", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ModalWindowComponent.prototype, "dataItemVisibility", void 0);
ModalWindowComponent = __decorate([
    Component({
        selector: 'm-w-del-all-done',
        template: "\n    <cap></cap>\n    <div class=\"modal-window\">\n        <h2 class=\"modal-window__header\">{{ message }}</h2>\n        <div class=\"modal-window__buttons\">\n            <flat-button (click)=\"this.dataItemVisibility.emit({itemVisibility: false})\" (mouseenter)=\"cancelRed = true\" (mouseleave)=\"cancelRed = false\" \n                    [style.color]=\"cancelRed ? 'red' : '#000'\" class=\"modal-window__btn filters__button filters__link animated\" [raised-button-name]=\"'No'\"></flat-button>\n            <raised-button (click)=\"this.dataItemVisibility.emit({itemVisibility: false, rmDone: true})\" (mouseenter)=\"delRed = true\" (mouseleave)=\"delRed = false\" \n                    [style.color]=\"delRed ? 'red' : '#000'\" id=\"del-all-completed\" class=\"modal-window__btn filters__button filters__link animated\" \n                    [raised-button-name]=\"'Yes'\"></raised-button>\n        </div>\n    </div>"
    }),
    __metadata("design:paramtypes", [])
], ModalWindowComponent);
export { ModalWindowComponent };
//# sourceMappingURL=modal-window.component.js.map