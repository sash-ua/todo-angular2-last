import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    Inject,
    Output,
    EventEmitter,
    Input
} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ErrorHandlerService} from "../../services/error.handler.service/error.handler.service";
import {TodosService} from "../../services/todos.service/todos.service";

@Component({
    moduleId: module.id,
    selector: 'auth-wndw',
    styleUrls:['auth.component.css'],
    template: `
    <cap [style.display]="isHiddenAuth === 'active' ? 'block' : 'none'"></cap>
    <button md-raised-button (click)="isHiddenAuth === 'active' ? isHiddenAuth = 'inactive' : isHiddenAuth = 'active';" class="reg-btn">{{this.logInBtn}}</button>
    <md-card id="auth-window" class="auth-window wrapper"
            (keyup.escape)="isHiddenAuth = 'inactive'; $event.stopPropagation();"
            [@openHide]="isHiddenAuth">
        <md-toolbar class="auth-window__sign-in">SignIn</md-toolbar>
        <md-card-content>
            <form name="sign-in">
                <div class="auth-window__form-group">
                    <md-input #si_email (keyup.enter)="signIn(si_email.value, si_pass.value); si_pass.value='';"
                        type="email" class="auth-window__input auth-window__input_email" placeholder="Email"></md-input>
                    <md-input #si_pass (keyup.enter)="signIn(si_email.value, si_pass.value); si_pass.value='';"
                        type="password" class="auth-window__input auth-window__input_pass" placeholder="Password"></md-input>
                </div>
            </form>
            <md-card-actions>
                <button md-raised-button [disableRipple]="true" 
                    (click)="signIn(si_email.value, si_pass.value); si_pass.value='';" 
                    class="auth-window__btn">Sign In</button>
                <button md-raised-button [disableRipple]="true" 
                    (click)="si_email.value=''; si_pass.value=''; isHiddenAuth = 'inactive';" 
                    class="auth-window__btn">Cancel</button>
            </md-card-actions>
        </md-card-content>
        <md-toolbar class="auth-window__sign-in">LogIn</md-toolbar>
        <md-card-content>
            <form name="log-in">
                <div class="auth-window__form-group">
                   <md-input #li_email (keyup.enter)="logIn(li_email.value, li_pass.value); li_pass.value='';" 
                        type="email" class="auth-window__input auth-window__input_email" placeholder="Email" autofocus></md-input>
                   <md-input #li_pass (keyup.enter)="logIn(li_email.value, li_pass.value); li_pass.value='';" 
                        type="password" class="auth-window__input auth-window__input_pass" placeholder="Password">></md-input>
                </div>
            </form>
            <md-card-actions>
                <button md-raised-button [disableRipple]="true" (click)="logIn(li_email.value, li_pass.value); li_pass.value='';" class="auth-window__btn">Log In</button>
                <button md-raised-button [disableRipple]="true" (click)="li_email.value=''; li_pass.value=''; isHiddenAuth = 'inactive';" class="auth-window__btn">Cancel</button>
            </md-card-actions>
        </md-card-content>
        <md-toolbar class="auth-window__sign-in">LogOut</md-toolbar>
        <md-card-content>
                <button md-raised-button [disableRipple]="true" (click)="logOut(); li_email.value=''; li_pass.value='';" class="auth-window__logout auth-window__btn">Log Out</button>
        </md-card-content>
    </md-card>
    <m-w-alert [data-id]="this.message" [data-bind]="alerts" class="m-w-alert"></m-w-alert>
    `,
    animations: [
        trigger('openHide',[
            state('active', style({height: '670px', opacity: 1})),
            state('inactive', style({height: 0})),
            transition('* <=> *', [
                animate(300)
            ])])
    ],
    providers: [AuthService]
})
export class AuthComponent {
    isHiddenAuth: string = 'inactive';
    private alerts: string = 'inactive';
    private authService: AuthService;
    private errorH:ErrorHandlerService;
    private todoService: TodosService;
    private message: string;

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(AuthService) authService: AuthService,
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService,
    ) {
        this.authService = authService;
        this.todoService = todoService;
        this.errorH = errorH;
    }

    @Input('data-logInBtn') logInBtn: string;
    @Output() guestAccInit: EventEmitter<{guestAccInit: boolean}> = new EventEmitter();

    signIn(email: string, pass: string){
        this.authService.signIn(email, pass)
            .then((resp: any) => {
                if(resp.uid){
                    this.signInMsgHandler("You have successfully registered!");
                    this.isHiddenAuth = 'inactive';
                }
            })
            .catch((error: Error) => {
                this.signInMsgHandler(this.errorH.displayErrors(error));
            });
    }
    logIn(email: string, pass: string){
        this.authService.logIn(email, pass)
            .then(resp => {
                if(resp.uid){
                    this.signInMsgHandler("You have successfully logged in!");
                    this.isHiddenAuth = 'inactive';
                }
            })
            .catch((error: Error) => {
                this.signInMsgHandler(this.errorH.displayErrors(error));
            });
    }
    logOut(){
        let s = this.authService.logOut()
            .then((resp: any) => {
                if(!resp) {
                    this.todoService.clearLocalStorage([this.todoService.lSName[0]]);
                    this.isHiddenAuth = 'inactive';
                    this.signInMsgHandler("You have successfully logged out!");
                    this.guestAccInit.emit({guestAccInit: true});
                }
            })
            .catch( (error: Error) => {
                this.errorH.handleError(error);
        });
    }
    // Info. messag
    signInMsgHandler(msg: string){
        this.message = msg;
        this.alerts = 'active';
        setTimeout(()=> {
            this.alerts = 'inactive';
        }, 2000);
    }
}