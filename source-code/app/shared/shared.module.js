"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var modal_window_component_1 = require("./modalWindow/modal-window.component");
var forms_1 = require("@angular/forms");
var cap_component_1 = require("./cap.component/cap.component");
var m_w_alert_component_1 = require("./modalWindow/m-w-alert.component");
var button_component_1 = require("./buttons.component/button.component");
var auth_form_component_1 = require("./auth-form.component/auth-form.component");
var material_1 = require("@angular/material");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            material_1.MaterialModule.forRoot()
        ],
        exports: [
            common_1.CommonModule,
            modal_window_component_1.ModalWindowComponent,
            cap_component_1.CapComponent,
            m_w_alert_component_1.MWAlertComponent,
            auth_form_component_1.AuthFormComponent,
            button_component_1.ButtonRaised,
            button_component_1.ButtonFlat
        ],
        declarations: [
            modal_window_component_1.ModalWindowComponent,
            cap_component_1.CapComponent,
            m_w_alert_component_1.MWAlertComponent,
            auth_form_component_1.AuthFormComponent,
            button_component_1.ButtonRaised,
            button_component_1.ButtonFlat
        ],
        providers: [],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map