"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
// ui
var material_1 = require("@angular/material");
// DB
var app_1 = require("firebase/app");
// components
var AppComponent_1 = require("./AppComponent");
// modules
var core_module_1 = require("./core/core.module");
var shared_module_1 = require("./shared/shared.module");
// services
var todos_service_1 = require("./services/todos.service/todos.service");
var auth_service_1 = require("./services/auth/auth.service");
var error_handler_service_1 = require("./services/error.handler.service/error.handler.service");
var list_item_1 = require("./types/listItem/list.item");
var hammerjs_config_1 = require("./configs/hammerjs.config");
exports.firebaseConfig = {
    apiKey: 'AIzaSyBFLWRbb4VXqoh_UXMA_wSwwzqwPyxmwDw',
    authDomain: 'todos-59dad.firebaseapp.com',
    databaseURL: 'https://todos-59dad.firebaseio.com',
    storageBucket: 'todos-59dad.appspot.com',
};
exports.FB = app_1.default.initializeApp(exports.firebaseConfig);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            core_module_1.CoreModule,
            shared_module_1.SharedModule,
            material_1.MaterialModule.forRoot()
        ],
        exports: [],
        declarations: [
            AppComponent_1.AppComponent
        ],
        providers: [
            todos_service_1.TodosService,
            error_handler_service_1.ErrorHandlerService,
            list_item_1.ListItem,
            auth_service_1.AuthService,
            { provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: hammerjs_config_1.HammerConfig }
        ],
        bootstrap: [AppComponent_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map