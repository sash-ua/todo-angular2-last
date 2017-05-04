var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
// ui
import { MaterialModule } from "@angular/material";
// DB
import firebase from 'firebase/app';
// components
import { AppComponent } from "./AppComponent";
// modules
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
// services
import { TodosService } from "./services/todos.service/todos.service";
import { AuthService } from "./services/auth/auth.service";
import { ErrorHandlerService } from "./services/error.handler.service/error.handler.service";
import { ListItem } from "./types/listItem/list.item";
import { HammerConfig } from "./configs/hammerjs.config";
export var firebaseConfig = {
    apiKey: 'AIzaSyBFLWRbb4VXqoh_UXMA_wSwwzqwPyxmwDw',
    authDomain: 'todos-59dad.firebaseapp.com',
    databaseURL: 'https://todos-59dad.firebaseio.com',
    storageBucket: 'todos-59dad.appspot.com',
};
export var FB = firebase.initializeApp(firebaseConfig);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            CoreModule,
            SharedModule,
            MaterialModule.forRoot()
        ],
        exports: [],
        declarations: [
            AppComponent
        ],
        providers: [
            TodosService,
            ErrorHandlerService,
            ListItem,
            AuthService,
            { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
        ],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map