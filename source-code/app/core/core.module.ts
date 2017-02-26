
import{NgModule}from'@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule}   from '@angular/common';
import {AuthComponent} from "./auth.component/auth.component";
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {TodoComponent} from "./todo/todo.component";



@NgModule({
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
export class CoreModule {}
