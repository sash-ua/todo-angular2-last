import {Injectable, Inject} from '@angular/core';
import {ErrorHandlerService} from "../error.handler.service/error.handler.service";
import {ListItem} from "../../types/listItem/list.item";
import {Observable} from "rxjs/Observable";

import {firebaseConfig} from "../../app.module";
import {FB as firebase} from "../../app.module";
import 'firebase/database';

@Injectable()
export class TodosService{
    public lSName: string[] = ['todos', 'guest_todos', 'true', 'userId', `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`,
        'Log In or Register', 'todos__item_todo'];
    private errorH: any;
    private  id: number;

    constructor(
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ) {
        this.errorH = errorH;
    }
    // Get data from database.
    getData(userId: string): Promise<any> {
        return firebase.database().ref('/' + userId).once('value');
    }
    setData(data: JSON, userId: string): Promise<any> {
        return firebase.database().ref('/' + userId).set(data);
    }
    // Create Observable from the object.
    createObs(obj: Object): Observable<Object> {
        return Observable.create((obs: Object) => obs.next(obj));
    }
    // Object to JSON string and vice versa
    jsonify(data: any): Array<any> {
        return (typeof data === 'object') ?
            JSON.stringify(data) :
            (typeof data === 'string') ?
                JSON.parse(data) :
                this.errorH.handleError(new Error('jsonify Error'));
    }
    // Get LS by key
    getLocalStorage(fn: Function): Function {
        return (key: string): Object => {
            return fn(localStorage.getItem(key));
        }
    }
    // Save data to LS and/or database
    setLocalStorage(arr: ListItem[], lSName: string[], userId?: string): void {
        let data: JSON = JSON.stringify(arr);
        if(userId === lSName[1] || !userId){
            localStorage.setItem(lSName[1], data);
        } else {
            localStorage.setItem(lSName[0], data);
            this.setData(data, userId);
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
    // App init. Get object, then the validity check with simpleJsonObjValid(), save to localStorage, init. listItems
    //  by return object.
    appInit(listItems: ListItem[], lSName: string[], userId: string): [ListItem[], boolean] {
        let b: [ListItem[], boolean];
        if(this.simpleJsonObjValid(listItems)){
            b =  [listItems, true];
        } else {
            b = [listItems = [], false];
        }
        this.setLocalStorage(listItems, lSName, userId);
        return b;
    }
    // Add item to array.
    addItem(val:any, arr: ListItem[]): ListItem[] {
        return arr.concat({id: ((arr.length) ? arr[arr.length-1].id + 1 : 0), value: val, done: false});
    }
    // Input string validation.
    inputValidation(value: string): boolean {
        return (typeof value == 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
    }
    // Highlight to do item done/undone
    highlightTodo(arr: ListItem[], state: boolean, id: number = null): ListItem[] {
        let nArr = arr.slice();
        if(id || id === 0){
            nArr[id].done = state;
            return nArr;
        } else {
            return nArr.map((obj)=>{
                obj.done = state;
                return obj;
            });
        }
    }
    // Edit to do item event handler.
    edit(el: HTMLElement, index: number, value: string, arr: ListItem[], lSName: string[], userId?: string): boolean {
        if(this.inputValidation(value)){
            arr[index].value = value;
            this.setLocalStorage(arr, lSName, userId);
            this.hideEl(el);
            return true;
        }
        return false;
    }
    // App. states handler
    changeStates(arr: ListItem[], lSName: string[], userId?: string): Object {
        let isChecked: boolean, hide: boolean, isHidden: boolean, quantityTodos: number;
        this.setLocalStorage(arr, lSName, userId);
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
    openCloseEditable(ev:   Event, todoState: boolean = false): void {
        if(todoState === false) {
            if (ev.target.children[2]) {
                if(window.getComputedStyle(ev.target.children[2],null).getPropertyValue("height") === '0px'){
                    ev.target.children[2].style.height = '75px';
                }else {
                    ev.target.children[2].style.height = '0';
                }
            }
        }
    }
    // Hide edit field of to do item by 'keyup.escape' event.
    hideEl(el: HTMLElement): void {
        el.parentNode.style.height = 0;
    }
    // Produce string with first 15 letters ot given string
    cutter(str: string): string {
        return str.length > 15 ? `${str.slice(0, 15)}...` : str.slice();
    }
}