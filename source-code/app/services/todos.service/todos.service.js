"use strict";
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
var core_1 = require('@angular/core');
var error_handler_service_1 = require("../error.handler.service/error.handler.service");
var Observable_1 = require("rxjs/Observable");
var app_module_1 = require("../../app.module");
//AOT
// import {FB} from "../../app.module";
// import {database, auth} from 'firebase';
//AOT todo
// JIT
var app_1 = require('firebase/app');
require('firebase/database');
// JIT
var TodosService = (function () {
    function TodosService(errorH) {
        this.lSName = ['todos', 'guest_todos', 'true', 'userId', ("firebase:authUser:" + app_module_1.firebaseConfig.apiKey + ":[DEFAULT]"), 'Log In or Register', 'todos__item_todo'];
        this.inputFieldHeight = '75px';
        this.errorH = errorH;
    }
    // Get data from database.
    TodosService.prototype.getData = function (userId) {
        return app_1.default.database().ref('/' + userId).once('value'); //JIT
        // return FB.database().ref('/' + userId).once('value'); //AOT todo
    };
    // Create Observable from the object.
    TodosService.prototype.createObs = function (obj) {
        return Observable_1.Observable.create(function (obs) { return obs.next(obj); });
    };
    // Object to JSON string and vice versa
    TodosService.prototype.jsonify = function (data) {
        return (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? JSON.parse(data) : new Error('jsonify Error');
    };
    // Get LS by key
    TodosService.prototype.getLocalStorage = function (key) {
        return localStorage.getItem(key);
    };
    // Save data to LS and/or database
    TodosService.prototype.setLocalStorage = function (arr, userId) {
        var data = JSON.stringify(arr);
        if (userId === this.lSName[1] || !userId) {
            localStorage.setItem(this.lSName[1], data);
        }
        else {
            localStorage.setItem(this.lSName[0], data);
            app_1.default.database().ref('/' + userId).set(data); //JIT
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
    // App init. Get JSON object, then the validity check with simpleJsonObjValid(), save to localStorage, init. listItems,
    // set id (index number of last to do item)
    TodosService.prototype.appInit = function (data, userId) {
        var listItems, init, id, savedObj = this.jsonify(data);
        if (this.simpleJsonObjValid(savedObj)) {
            listItems = savedObj;
            this.setLocalStorage(listItems, userId);
            return [listItems, true];
        }
        else {
            listItems = [];
            this.setLocalStorage(listItems, userId);
            return [listItems, false];
        }
    };
    // Add item to array.
    TodosService.prototype.addItem = function (val, arr) {
        arr.push({ id: ((arr.length) ? arr[arr.length - 1].id + 1 : 0), value: val, done: false });
        return arr;
    };
    // Input string validation.
    TodosService.prototype.inputValidation = function (value) {
        return (typeof value == 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
    };
    // Highlight to do item done/undone
    TodosService.prototype.highlightTodo = function (arr, state, id) {
        if (id === void 0) { id = null; }
        if (id || id === 0) {
            arr[id].done = state;
            return arr;
        }
        else {
            return arr.map(function (obj) {
                obj.done = state;
                return obj;
            });
        }
    };
    // Edit to do item event handler.
    TodosService.prototype.edit = function (el, index, value, arr, userId) {
        if (this.inputValidation(value)) {
            arr[index].value = value;
            this.setLocalStorage(arr, userId);
            this.hideEl(el);
            return true;
        }
        return false;
    };
    // App. states handler
    TodosService.prototype.changeStates = function (arr, userId) {
        var isChecked, hide, isHidden, quantityTodos;
        this.setLocalStorage(arr, userId);
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
                    ev.target.children[2].style.height = this.inputFieldHeight;
                }
                else {
                    ev.target.children[2].style.height = '0';
                }
            }
        }
        else {
            return false;
        }
    };
    // Hide edit field of to do item by 'keyup.escape' event.
    TodosService.prototype.hideEl = function (el) {
        el.parentNode.style.height = 0;
    };
    // Highlite filter's button when it clicked.
    TodosService.prototype.hightlightFilter = function (targetEl, selector) {
        document.querySelectorAll(selector).forEach(function (el, idx, arr) {
            el.classList.remove('act');
        });
        targetEl.classList.add('act');
    };
    TodosService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(error_handler_service_1.ErrorHandlerService)), 
        __metadata('design:paramtypes', [error_handler_service_1.ErrorHandlerService])
    ], TodosService);
    return TodosService;
}());
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map