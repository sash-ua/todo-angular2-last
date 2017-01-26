import {Injectable, Inject} from '@angular/core';
import {ErrorHandlerService} from "../error.handler.service/error.handler.service";
import {ListItem} from "../../todo/list.item";
import {Observable} from "rxjs/Observable";
import {firebaseConfig} from "../../app.module";
import {AppStates} from "../../todo/app.states";

//AOT
// import {FB} from "../../app.module";
// import {database, auth} from 'firebase';
//AOT todo

// JIT
import firebase from 'firebase/app';
import 'firebase/database';
// JIT

@Injectable()
export class TodosService{
    public lSName: string[] = ['todos', 'guest_todos', 'true', 'userId', `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`, 'Log In or Register', 'todos__item_todo'];
    private inputFieldHeight: string = '75px';
    private errorH: any;
    private  id: number;

    constructor(
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ) {
        this.errorH = errorH;
    }
    // Get data from database.
    getData(userId: string): Promise<any> {
        return firebase.database().ref('/' + userId).once('value'); //JIT
        // return FB.database().ref('/' + userId).once('value'); //AOT todo
    }
    // Create Observable from the object.
    createObs(obj: Object): Observable<Object> {
        return Observable.create((obs: Object) => obs.next(obj));
    }
    // Object to JSON string and vice versa
    jsonify(data: any): Array<any> {
        return (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? JSON.parse(data) : new Error('jsonify Error');
    }
    // Get LS by key
    getLocalStorage(key: string): string {
            return localStorage.getItem(key);
    }
    // Save data to LS and/or database
    setLocalStorage(arr: ListItem[], userId: string): void {
        let data = JSON.stringify(arr);
        if(userId === this.lSName[1] || !userId){
            localStorage.setItem(this.lSName[1], data);
        } else {
            localStorage.setItem(this.lSName[0], data);
            firebase.database().ref('/' + userId).set(data); //JIT
            // FB.database().ref('/' + userId).set(data); //AOT todo
        }
    }
    // Clear LS
    clearLocalStorage(arrNames: string[]): void {
        arrNames.forEach((el, idx, arr) => {
            localStorage.removeItem(el);
        });
    }
    // JS obj. validation
    simpleJsonObjValid(data: any): boolean{
        return (typeof (data) === 'object' && data !== null && data.length > 0);
    }
    // App init. Get JSON object, then the validity check with simpleJsonObjValid(), save to localStorage, init. listItems,
    // set id (index number of last to do item)
    appInit(data: JSON, userId: string ): any[] {
        let listItems: Array<any>,
            init: boolean,
            id: number,
            savedObj: Array<any> = this.jsonify(data);
        if(this.simpleJsonObjValid(savedObj)){
            listItems = savedObj;
            this.setLocalStorage(listItems, userId);
            return [listItems, true];
        } else {
            listItems = [];
            this.setLocalStorage(listItems, userId);
            return [listItems, false];
        }
    }
    // Add item to array.
    addItem(val:any, arr: ListItem[]): ListItem[] {
        arr.push({id: ((arr.length) ? arr[arr.length-1].id + 1 : 0), value: val, done: false});
        return arr;
    }
    // Input string validation.
    inputValidation(value: string): boolean {
        return (typeof value == 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
    }
    // Highlight to do item done/undone
    highlightTodo(arr: ListItem[], state: boolean, id: number = null): ListItem[] {
        if(id || id === 0){
            arr[id].done = state;
            return arr;
        } else {
            return arr.map((obj)=>{
                obj.done = state;
                return obj;
            });
        }
    }
    // Edit to do item event handler.
    edit(el: HTMLElement, index: number, value: string, arr: ListItem[], userId?: string): boolean {
        if(this.inputValidation(value)){
            arr[index].value = value;
            this.setLocalStorage(arr, userId);
            this.hideEl(el);
            return true;
        }
        return false;
    }
    // App. states handler
    changeStates(arr: ListItem[], userId?: string): Object {
        let isChecked: boolean, hide: boolean, isHidden: boolean, quantityTodos: number;
        this.setLocalStorage(arr, userId);
        isChecked = this.matchAllAndDone(arr);
        quantityTodos = arr.length;
        if(arr.length === 0) {
            hide = true;
            isHidden = false;
        } else {
            hide = false;
            isHidden = true;
        }
        return {isChecked: isChecked, hide: hide, isHidden: isHidden, quantityTodos: quantityTodos};
    }
    // Remove to do item by id.
    removeTodo(arr: ListItem[], id: number = null){
        if(id || id === 0) arr.splice(id, 1);
        return arr;
    }
    // Checkbox 'Check all todos' state handler. If every todos' checkboxes are checked,
    // then main checkbox too (state true), in other cases not checked (false).
    matchAllAndDone(arr: ListItem[]): boolean {
        let i: number,
            t: number = 0,
            l: number = arr.length;
        if(l === 0) return false;
        for(i = 0; i < l; i++){
            if(arr[i].done === true) {
                t++;
            }
        }
        return (t == l);
    }
    // Open / close editable to do item.
    openCloseEditable(ev:   Event, todoState: boolean = false): boolean {
        if(todoState === false) {
            if (ev.target.children[2]) {
                if(window.getComputedStyle(ev.target.children[2],null).getPropertyValue("height") === '0px'){
                    ev.target.children[2].style.height = this.inputFieldHeight;
                }else {
                    ev.target.children[2].style.height = '0';
                }
            }
        } else {
            return false;
        }
    }
    // Hide edit field of to do item by 'keyup.escape' event.
    hideEl(el: HTMLElement): void {
        el.parentNode.style.height = 0;
    }
    // Highlite filter's button when it clicked.
    hightlightFilter(targetEl: any, selector: string): void {
        document.querySelectorAll(selector).forEach((el, idx, arr) => {
            el.classList.remove('act');
        });
        targetEl.classList.add('act');
    }
}