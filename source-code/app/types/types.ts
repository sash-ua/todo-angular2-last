//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.

import {ListItem} from "./listItem/list.item";

export type LogIn = {logInBtn:string, listItems:ListItem[], isHidden:boolean, hide:boolean,
    isChecked:boolean, quantityTodos:number, userId: string};
export type LogInGuest = {logInBtn:string, listItems:ListItem[], isHidden:boolean, hide:boolean,
    isChecked:boolean, quantityTodos:number, userId?: string};
export type ReturnedStates = {listItems:ListItem[], isChecked?:boolean, hide:boolean, isHidden:boolean, quantityTodos?:number};
export type ModalWindowHandler = {itemVisibility: boolean, message: string, buffer: Object};
export type ModalWindowStates = {itemVisibility: boolean, index: number, el: HTMLElement, userId: number, message: string};
export type RmOrNot ={itemVisibility: boolean, rmDone?: boolean};
export type AuthForm = {email: string, pass: string, isHiddenAuth?: string};
