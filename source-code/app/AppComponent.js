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
var todos_service_1 = require("./services/todos.service/todos.service");
var error_handler_service_1 = require("./services/error.handler.service/error.handler.service");
var auth_service_1 = require("./services/auth/auth.service");
var Observable_1 = require("rxjs/Observable");
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/delay');
require('rxjs/add/observable/interval');
//AOT
// import {FB} from "./app.module";
// import {database, auth} from 'firebase';
//AOT todo
// JIT
var app_1 = require('firebase/app');
require('firebase/auth');
// JIT
var AppComponent = (function () {
    function AppComponent(todoService, authService, errorH) {
        this.hide = true;
        this.itemVisibility = false;
        this.buffer = {};
        this.errorH = errorH;
        this.todoService = todoService;
        this.authService = authService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Application initialisation when page was reloaded after we have been Logged in.
        var apiObj = this.todoService.jsonify(this.todoService.getLocalStorage(this.todoService.lSName[4]));
        if (typeof apiObj === 'object') {
            var userId_1 = apiObj.uid;
            this.todoService.getData(userId_1)
                .then(function (res) { return _this.appCmpntInit(_this.todoService.appInit(res.val(), apiObj.uid)); })
                .then(function (res) {
                var listItems = res.listItems;
                _this.setAppStates({
                    listItems: listItems,
                    isChecked: _this.todoService.matchAllAndDone(listItems),
                    quantityTodos: listItems.length,
                    isHidden: res.isHidden,
                    hide: res.hide,
                    logInBtn: "LoggedIn: " + apiObj.email,
                    userId: userId_1
                });
            })
                .catch(function (error) { return _this.errorH.handleError(error); });
        }
        else {
            // No user is signed in.
            this.setAppStates(this.guestInit(this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.lSName[1]), this.todoService.lSName[1]))));
        }
        // Application initialisation when we are logged in first time.
        app_1.default.auth().onAuthStateChanged(function (user) {
            // FB.auth().onAuthStateChanged((user: any) => { //AOT todo
            if (user) {
                // If any user is signed in.
                var userId_2 = user.uid;
                _this.todoService.getData(userId_2)
                    .then(function (res) { return _this.appCmpntInit(_this.todoService.appInit(res.val(), user.uid)); })
                    .then(function (res) {
                    var listItems = res.listItems;
                    _this.setAppStates({
                        listItems: listItems,
                        isChecked: _this.todoService.matchAllAndDone(listItems),
                        quantityTodos: listItems.length,
                        isHidden: res.isHidden,
                        hide: res.hide,
                        logInBtn: "LoggedIn: " + user.email,
                        userId: userId_2
                    });
                })
                    .catch(function (error) { return _this.errorH.handleError(error); });
            }
            else {
                // No user is signed in.
                _this.setAppStates(_this.guestInit(_this.appCmpntInit(_this.todoService.appInit(_this.todoService.getLocalStorage(_this.todoService.lSName[1]), _this.todoService.lSName[1]))));
            }
        }, (function (error) { return _this.errorH.handleError(error); }));
    };
    // Set App. component states
    AppComponent.prototype.setAppStates = function (obj) {
        if (obj.logInBtn) {
            (this.listItems = obj.listItems, this.isHidden = obj.isHidden, this.hide = obj.hide, this.logInBtn = obj.logInBtn, this.isChecked = obj.isChecked, this.quantityTodos = obj.quantityTodos, this.userId = obj.userId, obj);
        }
        else if (obj.itemVisibility) {
            (this.itemVisibility = obj.itemVisibility, this.message = obj.message, this.buffer = obj.buffer, obj);
        }
        else if (!obj.logInBtn) {
            (this.listItems = obj.listItems, this.isHidden = obj.isHidden, this.hide = obj.hide, this.isChecked = obj.isChecked, this.quantityTodos = obj.quantityTodos, obj);
        }
    };
    // Application initialisation without log in to database.
    AppComponent.prototype.guestInit = function (states, ev) {
        if (!ev || ev.guestAccInit === true) {
            var listItems = states.listItems;
            return {
                listItems: listItems,
                logInBtn: 'Log In or Register',
                isChecked: this.todoService.matchAllAndDone(listItems),
                quantityTodos: listItems.length,
                isHidden: states.isHidden,
                hide: states.hide
            };
        }
    };
    // Initialisation of some app. states. When there isn't any to do item, then button's filters and 'checkAll' checkBox are hidden.
    AppComponent.prototype.appCmpntInit = function (arr) {
        if (arr[1] === true) {
            return { listItems: arr[0], isHidden: true, hide: false };
        }
        else {
            return { listItems: arr[0], isHidden: false, hide: true };
        }
    };
    // User check 'checkAll' checkbox, then this func change app. states. Change this.listItems.
    AppComponent.prototype.checkAllFunc = function (arr, isCheckedState, state, userId) {
        return Object.assign({ listItems: this.todoService.highlightTodo(arr, state) }, this.todoService.changeStates(arr, userId));
    };
    // User add new to do item, then , then this func change app. states.
    AppComponent.prototype.onSubmit = function (val, listItems, userId) {
        if (this.todoService.inputValidation(val)) {
            var arr = this.todoService.addItem(val, listItems);
            return Object.assign({ listItems: arr }, this.todoService.changeStates(arr, userId));
        }
    };
    // Change app. states if some to do item was removed in this.listItems.
    AppComponent.prototype.checkAfterEvents = function (arr) {
        return Object.assign({ listItems: arr }, this.todoService.changeStates(arr));
    };
    // Get obj. from _todo.component.ts.modWinDelHandler => obj. to make the mod. win. visible etc.
    AppComponent.prototype.modalWindowAppearance = function (ev) {
        return { itemVisibility: ev.itemVisibility, message: ev.message, buffer: ev };
    };
    AppComponent.prototype.makeTodosMap = function (arr) {
        return arr.map(function (value, index, array) {
            return (value.done) ? true : false;
        });
    };
    //  Remove to do item by id or remove all done todos.
    AppComponent.prototype.rmTodoHandler = function (buffer, listItems, arr, userId) {
        var _this = this;
        var allTodosColl = document.getElementsByClassName(this.todoService.lSName[6]);
        var index = buffer.index;
        //  Remove one to_do.
        if ((index || index === 0) && arr.rmDone) {
            var x = this.todoService.createObs(buffer)
                .do(function (resp) {
                _this.rmTodoAnim(allTodosColl, resp.index);
            })
                .delay(150)
                .subscribe(function (resp) {
                var l = _this.todoService.removeTodo(listItems, resp.index);
                _this.setAppStates(Object.assign({}, { listItems: l }, _this.todoService.changeStates(l, userId)));
            }, function (error) { return _this.errorH.handleError(error); });
        }
        else if (!index && arr.rmDone) {
            var listItemsMap_1 = this.makeTodosMap(listItems);
            var arrL_1 = [];
            var prom = new Promise(function (res, rej) {
                var y = Observable_1.Observable.interval(150)
                    .do(function (i) {
                    if (i <= listItems.length - 1 && listItems[i].done) {
                        (listItemsMap_1[i]) ? _this.rmTodoAnim(allTodosColl, i) : y.unsubscribe();
                    }
                    else {
                        (!listItemsMap_1[i]) ? arrL_1.push(listItems[i]) : y.unsubscribe();
                    }
                })
                    .subscribe(function (i) {
                    if (i === listItems.length - 1) {
                        res(arrL_1);
                        y.unsubscribe();
                    }
                }, function (error) { return rej(_this.errorH.handleError(error)); });
            });
            prom.then(function (resp) {
                // To save the last removed item animation we should use the delay.
                setTimeout(function () {
                    _this.setAppStates(Object.assign({}, { listItems: arrL_1 }, _this.todoService.changeStates(arrL_1, userId)));
                }, 200);
            });
        }
    };
    // Remove todos Animation.
    AppComponent.prototype.rmTodoAnim = function (allTodosColl, index) {
        var w = this.todoService.createObs(allTodosColl)
            .do(function (resp) {
            resp[index].style.marginLeft = '100%';
            resp[index].style.opacity = '0';
            return resp;
        })
            .delay(150)
            .subscribe(function (resp) {
            resp[index].style.height = '0';
            resp[index].style.padding = '0';
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            styleUrls: ['app.component.css'],
            template: "<section class=\"wrapper\">\n        <div class=\"todos\">\n            <h1 class=\"todos__header\">To Do List</h1>\n            <div id=\"todos__body-id\" class=\"todos__body rel__item\">\n                <input type=\"text\" #name (keyup.enter)=\"setAppStates(onSubmit(name.value, listItems, userId)); name.value='';\" id=\"addItemInput\" \n                        class=\"todos__item\" placeholder=\"Add a to-do...\" [autofocus]=\"'true'\">\n                <input type=\"checkbox\" (click)=\"setAppStates(checkAllFunc(listItems, isChecked, mainCheckBox.checked, userId))\" [checked]=\"isChecked\" #mainCheckBox \n                        [class.hidden]=\"isHidden\"  class=\"todos__checkbox todos__checkbox_main\" title=\"Active / Done\">\n                    <all-todos [class.hide]=\"hide\"  [data-userid]=\"userId\" [data-todo-list]=\"listItems\" \n                            (eventDeleteObserver)=\"setAppStates(modalWindowAppearance($event))\" (eventObserver)=\"setAppStates($event)\" id=\"allTodos\"></all-todos>\n                <span [class.hide]=\"hide\" class=\"filters__count\">Total tasks: {{quantityTodos}}</span>\n            </div>\n            <div [class.hide]=\"hide\" class=\"rules\">Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>\n        </div>\n        <auth-wndw [data-logInBtn]=\"this.logInBtn\" \n            (guestAccInit)=\"this.setAppStates(this.guestInit(this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.lSName[1]), this.todoService.lSName[1])),$event))\" >\n        </auth-wndw>\n        <m-w-del-all-done id=\"m-w-del-all-done\" class=\"animated__long\" [style.display]=\"itemVisibility ? 'block' : 'none'\" [data-messages]=\"message\" (dataItemVisibility)=\"this.rmTodoHandler(buffer, listItems, $event, userId);itemVisibility = $event.itemVisibility;\"></m-w-del-all-done>\n    </section>",
            providers: []
        }),
        __param(0, core_1.Inject(todos_service_1.TodosService)),
        __param(1, core_1.Inject(auth_service_1.AuthService)),
        __param(2, core_1.Inject(error_handler_service_1.ErrorHandlerService)), 
        __metadata('design:paramtypes', [todos_service_1.TodosService, auth_service_1.AuthService, error_handler_service_1.ErrorHandlerService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=AppComponent.js.map