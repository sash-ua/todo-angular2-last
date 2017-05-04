import {ListItem} from "./listItem/list.item";

export type ReturnedStates = {listItems:ListItem[]} & {};
export type ModalWindowHandler = {itemVisibility: boolean, message: string, buffer: Object};
export type RmOrNot ={itemVisibility: boolean, rmDone?: boolean};
export type AuthForm = {email: string, pass: string, isHiddenAuth?: string};
export  type AnimationT = string | { [key: string]: string | number; }

export class AppStates {
    logInBtn:string;
    listItems:ListItem[];
    isHidden:boolean;
    hide:boolean;
    isChecked:boolean;
    quantityTodos:number;
    userId?: string;
}
export class ModalWindowStates {
    itemVisibility: boolean;
    index: number;
    el: HTMLElement;
    userId: number;
    message: string;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.