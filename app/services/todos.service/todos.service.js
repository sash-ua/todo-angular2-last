var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
import { ErrorHandlerService } from "../error.handler.service/error.handler.service";
import { Observable } from "rxjs/Observable";
import { firebaseConfig } from "../../app.module";
import { FB as firebase } from "../../app.module";
import 'firebase/database';
var TodosService = (function () {
    function TodosService(errorH) {
        this.lSName = ['todos', 'guest_todos', 'true', 'userId', "firebase:authUser:" + firebaseConfig.apiKey + ":[DEFAULT]",
            'Log In or Register', 'todos__item_todo'];
        this.errorH = errorH;
    }
    // Get data from database.
    TodosService.prototype.getData = function (userId) {
        return firebase.database().ref('/' + userId).once('value');
    };
    TodosService.prototype.setData = function (data, userId) {
        return firebase.database().ref('/' + userId).set(data);
    };
    // Create Observable from the object.
    TodosService.prototype.createObs = function (obj) {
        return Observable.create(function (obs) { return obs.next(obj); });
    };
    // Object to JSON string and vice versa
    TodosService.prototype.jsonify = function (data) {
        return (typeof data === 'object') ?
            JSON.stringify(data) :
            (typeof data === 'string') ?
                JSON.parse(data) :
                this.errorH.handleError(new Error('jsonify Error'));
    };
    // Get LS by key
    TodosService.prototype.getLocalStorage = function (fn) {
        return function (key) {
            return fn(localStorage.getItem(key));
        };
    };
    // Save data to LS and/or database
    TodosService.prototype.setLocalStorage = function (arr, lSName, userId) {
        var data = JSON.stringify(arr);
        if (userId === lSName[1] || !userId) {
            localStorage.setItem(lSName[1], data);
        }
        else {
            localStorage.setItem(lSName[0], data);
            this.setData(data, userId);
        }
    };
    // Clear LS
    TodosService.prototype.clearLocalStorage = function (arrNames) {
        arrNames.forEach(function (el, idx, arr) {
            localStorage.removeItem(el);
        });
    };
    // JS obj. validation
    TodosService.prototype.simpleJsonObjValid = function (data) {
        return (typeof (data) === 'object' && data !== null && data.length > 0);
    };
    // App init. Get object, then the validity check with simpleJsonObjValid(), save to localStorage, init. listItems
    //  by return object.
    TodosService.prototype.appInit = function (listItems, lSName, userId) {
        var b;
        if (this.simpleJsonObjValid(listItems)) {
            b = [listItems, true];
        }
        else {
            b = [listItems = [], false];
        }
        this.setLocalStorage(listItems, lSName, userId);
        return b;
    };
    // Add item to array.
    TodosService.prototype.addItem = function (val, arr) {
        return arr.concat({ id: ((arr.length) ? arr[arr.length - 1].id + 1 : 0), value: val, done: false });
    };
    // Input string validation.
    TodosService.prototype.inputValidation = function (value) {
        return (typeof value == 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
    };
    // Highlight to do item done/undone
    TodosService.prototype.highlightTodo = function (arr, state, id) {
        if (id === void 0) { id = null; }
        var nArr = arr.slice();
        if (id || id === 0) {
            nArr[id].done = state;
            return nArr;
        }
        else {
            return nArr.map(function (obj) {
                obj.done = state;
                return obj;
            });
        }
    };
    // Edit to do item event handler.
    TodosService.prototype.edit = function (el, index, value, arr, lSName, userId) {
        if (this.inputValidation(value)) {
            arr[index].value = value;
            this.setLocalStorage(arr, lSName, userId);
            this.hideEl(el);
            return true;
        }
        return false;
    };
    // App. states handler
    TodosService.prototype.changeStates = function (arr, lSName, userId) {
        var isChecked, hide, isHidden, quantityTodos;
        this.setLocalStorage(arr, lSName, userId);
        isChecked = this.matchAllAndDone(arr);
        quantityTodos = arr.length;
        if (arr.length === 0) {
            hide = true;
            isHidden = false;
        }
        else {
            hide = false;
            isHidden = true;
        }
        return { isChecked: isChecked, hide: hide, isHidden: isHidden, quantityTodos: quantityTodos };
    };
    // Remove to do item by id.
    TodosService.prototype.removeTodo = function (arr, id) {
        if (id === void 0) { id = null; }
        if (id || id === 0)
            arr.splice(id, 1);
        return arr;
    };
    // Checkbox 'Check all todos' state handler. If every todos' checkboxes are checked,
    // then main checkbox too (state true), in other cases not checked (false).
    TodosService.prototype.matchAllAndDone = function (arr) {
        var i, t = 0, l = arr.length;
        if (l === 0)
            return false;
        for (i = 0; i < l; i++) {
            if (arr[i].done === true) {
                t++;
            }
        }
        return (t == l);
    };
    // Open / close editable to do item.
    TodosService.prototype.openCloseEditable = function (ev, todoState) {
        if (todoState === void 0) { todoState = false; }
        if (todoState === false) {
            if (ev.target.children[2]) {
                if (window.getComputedStyle(ev.target.children[2], null).getPropertyValue("height") === '0px') {
                    ev.target.children[2].style.height = '75px';
                }
                else {
                    ev.target.children[2].style.height = '0';
                }
            }
        }
    };
    // Hide edit field of to do item by 'keyup.escape' event.
    TodosService.prototype.hideEl = function (el) {
        el.parentNode.style.height = 0;
    };
    // Produce string with first 15 letters ot given string
    TodosService.prototype.cutter = function (str) {
        return str.length > 15 ? str.slice(0, 15) + "..." : str.slice();
    };
    return TodosService;
}());
TodosService = __decorate([
    Injectable(),
    __param(0, Inject(ErrorHandlerService)),
    __metadata("design:paramtypes", [ErrorHandlerService])
], TodosService);
export { TodosService };
//# sourceMappingURL=todos.service.js.map