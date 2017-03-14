var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalWindowComponent } from "./modalWindow/modal-window.component";
import { FormsModule } from "@angular/forms";
import { CapComponent } from "./cap.component/cap.component";
import { MWAlertComponent } from "./modalWindow/m-w-alert.component";
import { ButtonRaised, ButtonFlat } from "./buttons.component/button.component";
import { AuthFormComponent } from "./auth-form.component/auth-form.component";
import { MaterialModule } from "@angular/material";
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            MaterialModule.forRoot()
        ],
        exports: [
            CommonModule,
            ModalWindowComponent,
            CapComponent,
            MWAlertComponent,
            AuthFormComponent,
            ButtonRaised,
            ButtonFlat
        ],
        declarations: [
            ModalWindowComponent,
            CapComponent,
            MWAlertComponent,
            AuthFormComponent,
            ButtonRaised,
            ButtonFlat
        ],
        providers: [],
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map