
import {Component, OnInit, Inject} from '@angular/core';
import {TodosService} from "./services/todos.service/todos.service";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";
import {AuthService} from "./services/auth/auth.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/interval';
import {ListItem} from "./todo/list.item";
import {AppStates} from "./todo/app.states";

//AOT
// import {FB} from "./app.module";
// import {database, auth} from 'firebase';
//AOT todo

// JIT
import firebase from 'firebase/app';
import 'firebase/auth';
// JIT

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styleUrls: ['app.component.css'],
    template:
    `<section class="wrapper">
        <div class="todos">
            <h1 class="todos__header">To Do List</h1>
            <div id="todos__body-id" class="todos__body rel__item">
                <input type="text" #name (keyup.enter)="setAppStates(onSubmit(name.value, listItems, userId)); name.value='';" id="addItemInput" 
                        class="todos__item" placeholder="Add a to-do..." [autofocus]="'true'">
                <input type="checkbox" (click)="setAppStates(checkAllFunc(listItems, isChecked, mainCheckBox.checked, userId))" [checked]="isChecked" #mainCheckBox 
                        [class.hidden]="isHidden"  class="todos__checkbox todos__checkbox_main" title="Active / Done">
                    <all-todos [class.hide]="hide"  [data-userid]="userId" [data-todo-list]="listItems" 
                            (eventDeleteObserver)="setAppStates(modalWindowAppearance($event))" (eventObserver)="setAppStates($event)" id="allTodos"></all-todos>
                <span [class.hide]="hide" class="filters__count">Total tasks: {{quantityTodos}}</span>
            </div>
            <div [class.hide]="hide" class="rules">Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>
        </div>
        <auth-wndw [data-logInBtn]="this.logInBtn" 
            (guestAccInit)="this.setAppStates(this.guestInit(this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.lSName[1]), this.todoService.lSName[1])),$event))" >
        </auth-wndw>
        <m-w-del-all-done id="m-w-del-all-done" class="animated__long" [style.display]="itemVisibility ? 'block' : 'none'" [data-messages]="message" (dataItemVisibility)="this.rmTodoHandler(buffer, listItems, $event, userId);itemVisibility = $event.itemVisibility;"></m-w-del-all-done>
    </section>`,
    providers: []
})

export class AppComponent implements OnInit{
    logInBtn: string;
    isHidden: boolean;
    hide: boolean = true;
    isChecked:boolean;
    quantityTodos: number;
    userId: string;
    errorH:ErrorHandlerService;
    todoService: TodosService;
    itemVisibility: boolean = false;
    message: string;
    listItems: ListItem[];
    private authService: AuthService;
    private buffer: Object = {};

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(AuthService) authService: AuthService,
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ){
        this.errorH = errorH;
        this.todoService = todoService;
        this.authService = authService;
    }
    ngOnInit() {
        // Application initialisation when page was reloaded after we have been Logged in.
        let apiObj = this.todoService.jsonify(this.todoService.getLocalStorage(this.todoService.lSName[4]));
        if(typeof apiObj === 'object'){
            let userId = apiObj.uid;
            this.todoService.getData(userId)
                .then((res: any) => { return this.appCmpntInit( this.todoService.appInit(res.val(), apiObj.uid))})
                .then((res: any) => {
                    let listItems = res.listItems;
                    this.setAppStates({
                        listItems: listItems,
                        isChecked:this.todoService.matchAllAndDone(listItems),
                        quantityTodos: listItems.length,
                        isHidden: res.isHidden,
                        hide: res.hide,
                        logInBtn: `LoggedIn: ${apiObj.email}`,
                        userId: userId
                    })
                })
                .catch((error: Error) => this.errorH.handleError(error));
        } else {
            // No user is signed in.
            this.setAppStates(this.guestInit(this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.lSName[1]), this.todoService.lSName[1]))));
        }
        // Application initialisation when we are logged in first time.
        firebase.auth().onAuthStateChanged((user: any) => { //JIT
        // FB.auth().onAuthStateChanged((user: any) => { //AOT todo
                if (user) {
                    // If any user is signed in.
                    let userId = user.uid;
                    this.todoService.getData(userId)
                        .then((res: any) => { return this.appCmpntInit( this.todoService.appInit(res.val(), user.uid))})
                        .then((res: any) => {
                            let listItems = res.listItems;
                            this.setAppStates({
                                listItems: listItems,
                                isChecked:this.todoService.matchAllAndDone(listItems),
                                quantityTodos: listItems.length,
                                isHidden: res.isHidden,
                                hide: res.hide,
                                logInBtn: `LoggedIn: ${user.email}`,
                                userId: userId
                            })
                    })
                        .catch((error: Error) => this.errorH.handleError(error));
                } else {
                    // No user is signed in.
                    this.setAppStates(this.guestInit(this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.lSName[1]), this.todoService.lSName[1]))));
                }
            },
            ((error: any) => this.errorH.handleError(error)))
    }
    // Set App. component states
    setAppStates(obj: AppStates): void {
            if(obj.logInBtn){
                ({listItems:this.listItems, isHidden:this.isHidden, hide:this.hide, logInBtn:this.logInBtn,
                isChecked:this.isChecked, quantityTodos:this.quantityTodos, userId: this.userId} = obj);
            } else if (obj.itemVisibility){
                ({itemVisibility: this.itemVisibility, message: this.message, buffer: this.buffer} = obj);
            } else if (!obj.logInBtn){
                ({listItems:this.listItems, isHidden:this.isHidden, hide:this.hide, isChecked:this.isChecked, quantityTodos:this.quantityTodos} = obj);
            }
    }
    // Application initialisation without log in to database.
    guestInit(states: AppStates, ev?: any): AppStates {
        if(!ev || ev.guestAccInit === true) {
            let listItems = states.listItems;
            return {
                listItems: listItems,
                logInBtn: 'Log In or Register',
                isChecked: this.todoService.matchAllAndDone(listItems),
                quantityTodos: listItems.length,
                isHidden:states.isHidden,
                hide: states.hide
            }
        }
    }
    // Initialisation of some app. states. When there isn't any to do item, then button's filters and 'checkAll' checkBox are hidden.
    appCmpntInit(arr: Array<any>): AppStates{
        if(arr[1] === true){
            return {listItems: arr[0], isHidden: true, hide: false};
        } else {
            return {listItems: arr[0], isHidden: false, hide: true};
        }
    }
    // User check 'checkAll' checkbox, then this func change app. states. Change this.listItems.
    checkAllFunc (arr: ListItem[], isCheckedState: boolean, state: boolean, userId?: string): AppStates {
        return Object.assign({listItems: this.todoService.highlightTodo(arr, state)}, this.todoService.changeStates(arr, userId));
    }
    // User add new to do item, then , then this func change app. states.
    onSubmit(val:any, listItems: ListItem[], userId?: string){
        if(this.todoService.inputValidation(val)) {
            let arr = this.todoService.addItem(val, listItems);
            return Object.assign({listItems: arr},this.todoService.changeStates(arr, userId));
        }
    }
    // Change app. states if some to do item was removed in this.listItems.
    checkAfterEvents(arr: Array<ListItem>){
        return Object.assign({listItems: arr}, this.todoService.changeStates(arr));
    }
    // Get obj. from _todo.component.ts.modWinDelHandler => obj. to make the mod. win. visible etc.
    modalWindowAppearance(ev: Object) {
        return {itemVisibility: ev.itemVisibility, message: ev.message, buffer: ev};
    }

    makeTodosMap(arr: ListItem[]): Array<boolean>{
        return arr.map((value: Object, index: number, array: Object[])=>{
            return (value.done) ? true : false;
        })
    }
    //  Remove to do item by id or remove all done todos.
    rmTodoHandler(buffer: Object, listItems: Array<ListItem>, arr: Array<any>, userId?: string){
        let allTodosColl: HTMLCollection = document.getElementsByClassName(this.todoService.lSName[6]);
        let index = buffer.index;
    //  Remove one to_do.
        if((index || index === 0) && arr.rmDone){
            let x = this.todoService.createObs(buffer)
                .do((resp: Object)=>{
                    this.rmTodoAnim(allTodosColl, resp.index);
                })
                .delay(150)
                .subscribe((resp: Object)=>{
                    let l = this.todoService.removeTodo(listItems, resp.index);
                    this.setAppStates(Object.assign({}, {listItems: l}, this.todoService.changeStates(l, userId)));
                },
                    error => this.errorH.handleError(error)
                );
    //  Remove all executed todos.
        } else if(!index && arr.rmDone) {
            let listItemsMap = this.makeTodosMap(listItems);
            let arrL: ListItem[] = [];
            let prom = new Promise((res, rej)=> {
                let y = Observable.interval(150)
                    .do((i) => {
                        if (i <= listItems.length - 1 && listItems[i].done) {
                            (listItemsMap[i]) ? this.rmTodoAnim(allTodosColl, i) : y.unsubscribe();
                        } else {
                            (!listItemsMap[i]) ? arrL.push(listItems[i]) : y.unsubscribe();
                        }
                    })
                    .subscribe((i) => {
                            if (i === listItems.length - 1) {
                                res(arrL);
                                y.unsubscribe();
                            }
                        },
                        (error) => rej(this.errorH.handleError(error)));
            });
            prom.then((resp)=>{
    // To save the last removed item animation we should use the delay.
                setTimeout(()=>{
                    this.setAppStates(Object.assign({}, {listItems: arrL}, this.todoService.changeStates(arrL, userId)));
                },200);
            });
        }
    }
    // Remove todos Animation.
    rmTodoAnim(allTodosColl: HTMLCollection, index: number){
        let w = this.todoService.createObs(allTodosColl)
            .do((resp: HTMLCollection)=> {
                resp[index].style.marginLeft = '100%';
                resp[index].style.opacity = '0';
                return resp;
            })
            .delay(150)
            .subscribe((resp: HTMLCollection)=>{
                resp[index].style.height = '0';
                resp[index].style.padding = '0';
            });
    }
}