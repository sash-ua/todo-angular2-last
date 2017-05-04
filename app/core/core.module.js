var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { AuthComponent } from "./auth.component/auth.component";
import { MaterialModule } from "@angular/material";
import { SharedModule } from "../shared/shared.module";
import { TodoComponent } from "./todo/todo.component";
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            SharedModule,
            MaterialModule.forRoot()
        ],
        exports: [
            AuthComponent,
            TodoComponent
        ],
        declarations: [
            AuthComponent,
            TodoComponent
        ],
        providers: [],
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map