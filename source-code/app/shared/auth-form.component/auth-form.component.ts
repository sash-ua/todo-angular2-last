import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AuthForm} from "../../types/types";

@Component({
    moduleId: module.id,
    selector: 'auth-form',
    styleUrls:['auth-form.component.css'],
    template: `
    <md-toolbar class="auth-form__name">{{ name }}</md-toolbar>
    <md-card-content class="auth-form__cntnt">
        <form name="name">
            <div>
                <md-input #si_email (keyup.enter)="authEvent.emit({email: si_email.value, pass:si_pass.value}); si_pass.value='';"
                    type="email" class="auth-form__input" placeholder="Email">{{ si_email.value }}</md-input>
                <md-input #si_pass (keyup.enter)="authEvent.emit({email: si_email.value, pass:si_pass.value}); si_pass.value='';"
                    type="password" class="auth-form__input" placeholder="Password"></md-input>
            </div>
        </form>
        <md-card-actions>
            <raised-button [raised-button-name]="name"
                (click)="authEvent.emit({email: si_email.value, pass:si_pass.value}); si_pass.value='';"></raised-button>
            <flat-button [raised-button-name]="'Cancel'"
                (click)="authEvent.emit({isHiddenAuth: 'inactive'}); si_email.value=''; si_pass.value='';"></flat-button>
        </md-card-actions>
    </md-card-content>`
})
export class AuthFormComponent {
    @Input ('auth-form-name') name: string;
    @Output () authEvent: EventEmitter<AuthForm> = new EventEmitter();
}



//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.