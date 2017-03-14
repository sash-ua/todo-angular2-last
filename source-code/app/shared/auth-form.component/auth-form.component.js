var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var AuthFormComponent = (function () {
    function AuthFormComponent() {
        this.authEvent = new EventEmitter();
    }
    return AuthFormComponent;
}());
__decorate([
    Input('auth-form-name'),
    __metadata("design:type", String)
], AuthFormComponent.prototype, "name", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AuthFormComponent.prototype, "authEvent", void 0);
AuthFormComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'auth-form',
        styleUrls: ['auth-form.component.css'],
        template: "\n    <md-toolbar class=\"auth-form__name\">{{ name }}</md-toolbar>\n    <md-card-content class=\"auth-form__cntnt\">\n        <form name=\"name\">\n            <div>\n                <md-input #si_email (keyup.enter)=\"authEvent.emit({email: si_email.value, pass:si_pass.value}); si_pass.value='';\"\n                    type=\"email\" class=\"auth-form__input\" placeholder=\"Email\">{{ si_email.value }}</md-input>\n                <md-input #si_pass (keyup.enter)=\"authEvent.emit({email: si_email.value, pass:si_pass.value}); si_pass.value='';\"\n                    type=\"password\" class=\"auth-form__input\" placeholder=\"Password\"></md-input>\n            </div>\n        </form>\n        <md-card-actions>\n            <raised-button [raised-button-name]=\"name\"\n                (click)=\"authEvent.emit({email: si_email.value, pass:si_pass.value}); si_pass.value='';\"></raised-button>\n            <flat-button [raised-button-name]=\"'Cancel'\"\n                (click)=\"authEvent.emit({isHiddenAuth: 'inactive'}); si_email.value=''; si_pass.value='';\"></flat-button>\n        </md-card-actions>\n    </md-card-content>"
    })
], AuthFormComponent);
export { AuthFormComponent };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=auth-form.component.js.map