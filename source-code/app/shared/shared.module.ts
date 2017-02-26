
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalWindowComponent} from "./modalWindow/modal-window.component";
import {FormsModule} from "@angular/forms";
import {CapComponent} from "./cap.component/cap.component";
import {MWAlertComponent} from "./modalWindow/m-w-alert.component";
import {ButtonRaised} from "./buttons.component/button.component";
import {AuthFormComponent} from "./auth-form.component/auth-form.component";
import {MaterialModule} from "@angular/material";


@NgModule({
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
        ButtonRaised,
        AuthFormComponent
    ],
    declarations: [
        ModalWindowComponent,
        CapComponent,
        MWAlertComponent,
        ButtonRaised,
        AuthFormComponent
    ],
    providers: [],
})
export class SharedModule {}
