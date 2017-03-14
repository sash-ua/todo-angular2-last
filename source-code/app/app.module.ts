
import {NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

// ui
import {MaterialModule} from "@angular/material";

// DB
import firebase from 'firebase/app';

// components
import {AppComponent} from "./AppComponent";

// modules
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

// services
import {TodosService} from "./services/todos.service/todos.service";
import {AuthService} from "./services/auth/auth.service";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";
import {ListItem} from "./types/listItem/list.item";
import {HammerConfig} from "./configs/hammerjs.config";

export const firebaseConfig = {
    apiKey: 'AIzaSyBFLWRbb4VXqoh_UXMA_wSwwzqwPyxmwDw',
    authDomain: 'todos-59dad.firebaseapp.com',
    databaseURL: 'https://todos-59dad.firebaseio.com',
    storageBucket: 'todos-59dad.appspot.com',
};

export  const FB = firebase.initializeApp(firebaseConfig);

@NgModule({
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
export class AppModule {
}
