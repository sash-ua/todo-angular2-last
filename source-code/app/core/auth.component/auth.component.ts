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
import {AuthForm} from "../../types/types";

@Component({
    moduleId: module.id,
    selector: 'auth-wndw',
    styleUrls:['auth.component.css'],
    template: `
    <cap [style.display]="isHiddenAuth === 'active' ? 'block' : 'none'"></cap>
    <raised-button [raised-button-name]="this.logInBtn" (click)="isHiddenAuth === 'active' ? isHiddenAuth = 'inactive' : isHiddenAuth = 'active';" class="reg-btn"></raised-button>
    <md-card id="auth-window" class="auth-window wrapper"
            (keyup.escape)="isHiddenAuth = 'inactive'; $event.stopPropagation();"
            [@openHide]="isHiddenAuth">
        <auth-form [auth-form-name]="'SignIn'" (authEvent)="signIn($event)"></auth-form>
        <auth-form [auth-form-name]="'LogIn'" (authEvent)="logIn($event)"></auth-form>
        <md-toolbar class="auth-window__logout-name">LogOut</md-toolbar>
        <md-card-content class="auth-window__logout">
                <raised-button [raised-button-name]="'Log Out'" (click)="logOut();"></raised-button>
        </md-card-content>
    </md-card>
    <m-w-alert [data-id]="this.message" [data-bind]="alerts" class="m-w-alert"></m-w-alert>
    `,
    animations: [
        trigger('openHide',[
            state('active', style({height: '595px', opacity: 1})),
            state('inactive', style({height: 0, transform: 'translateX(100%)'})),
            transition('* <=> *', [
                animate(300)
            ])])
    ],
    providers: [AuthService]
})
export class AuthComponent {
    private isHiddenAuth: string = 'inactive';
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

    signIn(ev: AuthForm){
        if(ev.isHiddenAuth){
            this.isHiddenAuth = 'inactive';
        } else {
            this.authService.signIn(ev.email, ev.pass)
                .then((resp: any) => {
                    console.log(resp);
                    if(resp.uid){
                        this.signInMsgHandler("You have successfully registered!");
                        this.isHiddenAuth = 'inactive';
                    }
                })
                .catch((error: Error) => {
                    this.signInMsgHandler(this.errorH.displayErrors(error));
                });
        }
    }
    logIn(ev: AuthForm){
        if(ev.isHiddenAuth){
            this.isHiddenAuth = 'inactive';
        } else {
            this.authService.logIn(ev.email, ev.pass)
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
    }
    logOut(){
        this.authService.logOut()
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