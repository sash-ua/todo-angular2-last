//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.
import {ListItem} from "./list.item";

export class AppStates{
    logInBtn?: string;
    isHidden?: boolean;
    hide?: boolean;
    isChecked?:boolean;
    quantityTodos?: number;
    userId?: string;
    itemVisibility?: boolean;
    message?: string;
    listItems?: ListItem[];
    buffer?: Object;
    rmTodoAnimObj?: Object;
}