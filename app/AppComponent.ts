import {Component, OnInit, Inject} from '@angular/core';
import {TodosService} from "./services/todos.service/todos.service";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/interval';
import {ListItem} from "./types/listItem/list.item";
import {AppStates, ReturnedStates, ModalWindowStates} from "./types/types";

import {FB as firebase} from "./app.module";
import 'firebase/auth';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styleUrls: ['app.component.css'],
    template:
    `<section class="wrapper">
        <div class="todos">
            <h1 class="todos__header">To Do List</h1>
            <div id="todos__body-id" class="todos__body rel__item">
                <input type="text" #name (keyup.enter)="setAppStates(3, onSubmit(name.value, listItems, todoService.lSName, userId)); name.value='';" id="addItemInput" 
                        class="todos__item" placeholder="Add a to-do..." [autofocus]="'true'">
                <input type="checkbox" (click)="setAppStates(3,checkAllFunc(listItems, mainCheckBox.checked, todoService.lSName, userId))" [checked]="isChecked" #mainCheckBox 
                        [class.hidden]="isHidden"  class="todos__checkbox todos__checkbox_main" title="Active / Done">
                    <all-todos [class.hide]="hide"  [data-userid]="userId" [data-todo-list]="listItems" 
                            (eventDeleteObserver)="setAppStates(2, modalWindowAppearance($event))" (eventObserver)="setAppStates(3, $event)" id="allTodos"></all-todos>
                <span [class.hide]="hide" class="filters__count">Total tasks: {{quantityTodos}}</span>
            </div>
            <div [class.hide]="hide" class="rules">Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>
        </div>
        <auth-wndw [data-logInBtn]="logInBtn" 
            (guestAccInit)="setAppStates(1, guestInit(
                appCmpntInit(todoService.appInit( todoService.getLocalStorage(this.todoService.jsonify)(todoService.lSName[1]), todoService.lSName, todoService.lSName[1])), 
                    todoService.matchAllAndDone,$event))" >
        </auth-wndw>
        <m-w-del-all-done [style.display]="itemVisibility ? 'block' : 'none'" [data-messages]="message" (dataItemVisibility)="rmTodoHandler(buffer, listItems, $event, userId);itemVisibility = $event.itemVisibility;"></m-w-del-all-done>
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
    private buffer: Object = {};

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ){
        this.errorH = errorH;
        this.todoService = todoService;
    }
    ngOnInit() {
        // Application initialisation when page was reloaded after we have been Logged in.
        let apiObj = this.todoService.getLocalStorage(this.todoService.jsonify)(this.todoService.lSName[4]);
        if(typeof apiObj === 'object'){
            this.authorisationDataHandler(apiObj, this.todoService.lSName);
        } else {
            // No user is signed in.
            this.setAppStates(1,
                this.guestInit(
                    this.appCmpntInit(
                        this.todoService.appInit(
                            this.todoService.getLocalStorage(this.todoService.jsonify)(this.todoService.lSName[1]),
                            this.todoService.lSName,
                            this.todoService.lSName[1]
                        )
                    ),
                    this.todoService.matchAllAndDone
                )
            );
        }
        // Application initialisation when we are logged in first time.
        firebase.auth().onAuthStateChanged((user: any) => {
                if (user) {
                    this.authorisationDataHandler(user, this.todoService.lSName);
                } else {
                    // No user is signed in.
                    this.setAppStates(1,
                        this.guestInit(
                            this.appCmpntInit(
                                this.todoService.appInit(
                                    this.todoService.getLocalStorage(this.todoService.jsonify)(this.todoService.lSName[1]),
                                    this.todoService.lSName,
                                    this.todoService.lSName[1]
                                )
                            ),
                            this.todoService.matchAllAndDone
                        )
                    );
                }
            },
            ((error: any) => this.errorH.handleError(error)));
    }

    // Got object from Firebase, passed to function to initialize application after authorisation process.
    authorisationDataHandler(obj: FirebaseAuthData, lSName: string[]): void {
        let userId = obj.uid;
        this.todoService.getData(userId)
            .then((res: any) => { return this.appCmpntInit( this.todoService.appInit(this.todoService.jsonify(res.val()), lSName, userId))})
            .then((res: any) => {
                let listItems = res.listItems;
                this.setAppStates(1, {
                    listItems: listItems,
                    isChecked: this.todoService.matchAllAndDone(listItems),
                    quantityTodos: listItems.length,
                    isHidden: res.isHidden,
                    hide: res.hide,
                    logInBtn: `LoggedIn: ${obj.email}`,
                    userId: userId
                })
            })
            .catch((error: Error) => this.errorH.handleError(error));
    }


    // Set App. component states
    setAppStates(f: number, obj: object): void {
            if(f === 1){
                ({listItems:this.listItems, logInBtn:this.logInBtn, isHidden:this.isHidden, hide:this.hide,
                    isChecked:this.isChecked, quantityTodos:this.quantityTodos, userId: this.userId} = obj);
            } else if (f === 2){
                ({itemVisibility: this.itemVisibility, message: this.message, buffer: this.buffer} = obj);
            } else if (f === 3){
                ({listItems:this.listItems, isHidden:this.isHidden, hide:this.hide, isChecked:this.isChecked,
                    quantityTodos:this.quantityTodos} = obj);
            }
    }
    // Application initialisation without log in to database.
    guestInit(states: ReturnedStates, matchAllAndDone: Function, ev?: any): AppStates {
        if(!ev || ev.guestAccInit === true) {
            let listItems = states.listItems;
            return {
                listItems: listItems,
                logInBtn: 'Log In or Register',
                isChecked: matchAllAndDone(listItems),
                quantityTodos: listItems.length,
                isHidden:states.isHidden,
                hide: states.hide
            }
        }
    }
    // Initialisation of some app. states. When there isn't any to_do item, then button's filters and 'checkAll' checkBox are hidden.
    appCmpntInit(arr: Array<any>): ReturnedStates{
        if(arr[1] === true){
            return {listItems: arr[0], isHidden: true, hide: false};
        } else {
            return {listItems: arr[0], isHidden: false, hide: true};
        }
    }
    // User check 'checkAll' checkbox, then this func change app. states. Change this.listItems.
    checkAllFunc (arr: ListItem[], state: boolean, lSName: string[], userId?: string): ReturnedStates {
        return Object.assign({}, {listItems: this.todoService.highlightTodo(arr, state)}, this.todoService.changeStates(arr, lSName, userId));
    }
    // User add new to do item, then , then this func change app. states.
    onSubmit(val:any, listItems: ListItem[], lSName: string[], userId?: string): ReturnedStates{
        if(this.todoService.inputValidation(val)) {
            let arr = this.todoService.addItem(val, listItems);
            return Object.assign({listItems: arr},this.todoService.changeStates(arr, lSName, userId));
        }
    }
    // Get obj. from _todo.component.ts.modWinDelHandler => obj. to make the mod. win. visible etc.
    modalWindowAppearance(ev: ModalWindowStates) {
        return {itemVisibility: ev.itemVisibility, message: ev.message, buffer: ev};
    }
    // Create a map of todos<ListItem[]>. Copy to the map by it is done to_do or not.
    // It's created before remove all done todos and use to control to_do's removing.
    // Done to_do is checked as done in map then it can be removed, if not -> stop removing at all.
    makeTodosMap(arr: ListItem[]): Array<boolean>{
        return arr.map((value: Object, index: number, array: Object[])=>{
            return (value.done);
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
                    let loc = this.todoService.removeTodo(listItems, resp.index);
                    this.setAppStates(3, {listItems: loc, ...this.todoService.changeStates(loc, this.todoService.lSName, userId)});
                },
                    error => this.errorH.handleError(error)
                );
    //  Remove all executed todos.
        } else if(!index && arr.rmDone) {
            let listItemsMap = this.makeTodosMap(listItems);
            let arrL: ListItem[] = [];
            // To get Data from async block (see lower) we can use Promise
            let prom = new Promise((res, rej)=> {
                // async block
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
                    this.setAppStates(3, {listItems: arrL, ...this.todoService.changeStates(arrL, this.todoService.lSName, userId)});
                },200);
            });
        }
    }
    // Remove todos - Animation.
    rmTodoAnim(allTodosColl: HTMLCollection, index: number): void {
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