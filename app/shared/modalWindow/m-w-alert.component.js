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
import { AnimationsService } from "../../services/animations.service/animations.service";
var MWAlertComponent = (function () {
    function MWAlertComponent() {
    }
    return MWAlertComponent;
}());
__decorate([
    Input('data-id'),
    __metadata("design:type", String)
], MWAlertComponent.prototype, "message", void 0);
__decorate([
    Input('data-bind'),
    __metadata("design:type", String)
], MWAlertComponent.prototype, "alerts", void 0);
MWAlertComponent = __decorate([
    Component({
        selector: 'm-w-alert',
        template: "\n    <div [@openHide]=\"alerts\"  class=\"modal-window modal-window_alerts\">\n        <h4 class=\"modal-window__header\">{{this.message}}</h4>\n    </div>",
        animations: [
            AnimationsService.animaton('openHide', { height: 'auto', opacity: 1 }, { height: '0%', opacity: 0 })
        ],
        providers: [
            AnimationsService
        ]
    }),
    __metadata("design:paramtypes", [])
], MWAlertComponent);
export { MWAlertComponent };
//# sourceMappingURL=m-w-alert.component.js.map