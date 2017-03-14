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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MWAlertComponent = (function () {
    function MWAlertComponent() {
    }
    return MWAlertComponent;
}());
__decorate([
    core_1.Input('data-id'),
    __metadata("design:type", String)
], MWAlertComponent.prototype, "message", void 0);
__decorate([
    core_1.Input('data-bind'),
    __metadata("design:type", String)
], MWAlertComponent.prototype, "alerts", void 0);
MWAlertComponent = __decorate([
    core_1.Component({
        selector: 'm-w-alert',
        template: "\n    <div [@openHide]=\"alerts\"  class=\"modal-window modal-window_alerts\">\n        <h4 class=\"modal-window__header\">{{this.message}}</h4>\n    </div>",
        animations: [
            core_1.trigger('openHide', [
                core_1.state('active', core_1.style({ height: 'auto', opacity: 1, padding: '8px' })),
                core_1.state('inactive', core_1.style({ height: '0%', opacity: 0, padding: 0 })),
                core_1.transition('* <=> *', [
                    core_1.animate(300)
                ])
            ])
        ],
    }),
    __metadata("design:paramtypes", [])
], MWAlertComponent);
exports.MWAlertComponent = MWAlertComponent;
//# sourceMappingURL=m-w-alert.component.js.map