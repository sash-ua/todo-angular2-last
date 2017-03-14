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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todos_service_1 = require("./services/todos.service/todos.service");
var error_handler_service_1 = require("./services/error.handler.service/error.handler.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/observable/interval");
var app_module_1 = require("./app.module");
require("firebase/auth");
var AppComponent = (function () {
    function AppComponent(todoService, errorH) {
        this.hide = true;
        this.itemVisibility = false;
        this.buffer = {};
        this.errorH = errorH;
        this.todoService = todoService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Application initialisation when page was reloaded after we have been Logged in.
        var apiObj = this.todoService.getLocalStorage(this.todoService.jsonify)(this.todoService.lSName[4]);
        if (typeof apiObj === 'object') {
            this.authorisationDataHandler(apiObj, this.todoService.lSName);
        }
        else {
            // No user is signed in.
            this.setAppStates(1, this.guestInit(this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.jsonify)(this.todoService.lSName[1]), this.todoService.lSName, this.todoService.lSName[1])), this.todoService.matchAllAndDone));
        }
        // Application initialisation when we are logged in first time.
        app_module_1.FB.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.authorisationDataHandler(user, _this.todoService.lSName);
            }
            else {
                // No user is signed in.
                _this.setAppStates(1, _this.guestInit(_this.appCmpntInit(_this.todoService.appInit(_this.todoService.getLocalStorage(_this.todoService.jsonify)(_this.todoService.lSName[1]), _this.todoService.lSName, _this.todoService.lSName[1])), _this.todoService.matchAllAndDone));
            }
        }, (function (error) { return _this.errorH.handleError(error); }));
    };
    // Got object from Firebase, passed to function to initialize application after authorisation process.
    AppComponent.prototype.authorisationDataHandler = function (obj, lSName) {
        var _this = this;
        var userId = obj.uid;
        this.todoService.getData(userId)
            .then(function (res) { return _this.appCmpntInit(_this.todoService.appInit(_this.todoService.jsonify(res.val()), lSName, userId)); })
            .then(function (res) {
            var listItems = res.listItems;
            _this.setAppStates(1, {
                listItems: listItems,
                isChecked: _this.todoService.matchAllAndDone(listItems),
                quantityTodos: listItems.length,
                isHidden: res.isHidden,
                hide: res.hide,
                logInBtn: "LoggedIn: " + obj.email,
                userId: userId
            });
        })
            .catch(function (error) { return _this.errorH.handleError(error); });
    };
    // Set App. component states
    AppComponent.prototype.setAppStates = function (f, obj) {
        if (f === 1) {
            (this.listItems = obj.listItems, this.logInBtn = obj.logInBtn, this.isHidden = obj.isHidden, this.hide = obj.hide, this.isChecked = obj.isChecked, this.quantityTodos = obj.quantityTodos, this.userId = obj.userId);
        }
        else if (f === 2) {
            (this.itemVisibility = obj.itemVisibility, this.message = obj.message, this.buffer = obj.buffer);
        }
        else if (f === 3) {
            (this.listItems = obj.listItems, this.isHidden = obj.isHidden, this.hide = obj.hide, this.isChecked = obj.isChecked, this.quantityTodos = obj.quantityTodos);
        }
    };
    // Application initialisation without log in to database.
    AppComponent.prototype.guestInit = function (states, matchAllAndDone, ev) {
        if (!ev || ev.guestAccInit === true) {
            var listItems = states.listItems;
            return {
                listItems: listItems,
                logInBtn: 'Log In or Register',
                isChecked: matchAllAndDone(listItems),
                quantityTodos: listItems.length,
                isHidden: states.isHidden,
                hide: states.hide
            };
        }
    };
    // Initialisation of some app. states. When there isn't any to_do item, then button's filters and 'checkAll' checkBox are hidden.
    AppComponent.prototype.appCmpntInit = function (arr) {
        if (arr[1] === true) {
            return { listItems: arr[0], isHidden: true, hide: false };
        }
        else {
            return { listItems: arr[0], isHidden: false, hide: true };
        }
    };
    // User check 'checkAll' checkbox, then this func change app. states. Change this.listItems.
    AppComponent.prototype.checkAllFunc = function (arr, state, lSName, userId) {
        return Object.assign({ listItems: this.todoService.highlightTodo(arr, state) }, this.todoService.changeStates(arr, lSName, userId));
    };
    // User add new to do item, then , then this func change app. states.
    AppComponent.prototype.onSubmit = function (val, listItems, lSName, userId) {
        if (this.todoService.inputValidation(val)) {
            var arr = this.todoService.addItem(val, listItems);
            return Object.assign({ listItems: arr }, this.todoService.changeStates(arr, lSName, userId));
        }
    };
    // Get obj. from _todo.component.ts.modWinDelHandler => obj. to make the mod. win. visible etc.
    AppComponent.prototype.modalWindowAppearance = function (ev) {
        return { itemVisibility: ev.itemVisibility, message: ev.message, buffer: ev };
    };
    // Create a map of todos<ListItem[]>. Copy to the map by it is done to_do or not.
    // It's created before remove all done todos and use to control to_do's removing.
    // Done to_do is checked as done in map then it can be removed, if not -> stop removing at all.
    AppComponent.prototype.makeTodosMap = function (arr) {
        return arr.map(function (value, index, array) {
            return (value.done);
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
                var loc = _this.todoService.removeTodo(listItems, resp.index);
                _this.setAppStates(3, Object.assign({}, { listItems: loc }, _this.todoService.changeStates(loc, _this.todoService.lSName, userId)));
            }, function (error) { return _this.errorH.handleError(error); });
            //  Remove all executed todos.
        }
        else if (!index && arr.rmDone) {
            var listItemsMap_1 = this.makeTodosMap(listItems);
            var arrL_1 = [];
            // To get Data from async block (see lower) we can use Promise
            var prom = new Promise(function (res, rej) {
                // async block
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
                    _this.setAppStates(3, Object.assign({}, { listItems: arrL_1 }, _this.todoService.changeStates(arrL_1, _this.todoService.lSName, userId)));
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
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-root',
        styleUrls: ['app.component.css'],
        template: "<section class=\"wrapper\">\n        <div class=\"todos\">\n            <h1 class=\"todos__header\">To Do List</h1>\n            <div id=\"todos__body-id\" class=\"todos__body rel__item\">\n                <input type=\"text\" #name (keyup.enter)=\"setAppStates(3, onSubmit(name.value, listItems, todoService.lSName, userId)); name.value='';\" id=\"addItemInput\" \n                        class=\"todos__item\" placeholder=\"Add a to-do...\" [autofocus]=\"'true'\">\n                <input type=\"checkbox\" (click)=\"setAppStates(3,checkAllFunc(listItems, mainCheckBox.checked, todoService.lSName, userId))\" [checked]=\"isChecked\" #mainCheckBox \n                        [class.hidden]=\"isHidden\"  class=\"todos__checkbox todos__checkbox_main\" title=\"Active / Done\">\n                    <all-todos [class.hide]=\"hide\"  [data-userid]=\"userId\" [data-todo-list]=\"listItems\" \n                            (eventDeleteObserver)=\"setAppStates(2, modalWindowAppearance($event))\" (eventObserver)=\"setAppStates(3, $event)\" id=\"allTodos\"></all-todos>\n                <span [class.hide]=\"hide\" class=\"filters__count\">Total tasks: {{quantityTodos}}</span>\n            </div>\n            <div [class.hide]=\"hide\" class=\"rules\">Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>\n        </div>\n        <auth-wndw [data-logInBtn]=\"logInBtn\" \n            (guestAccInit)=\"setAppStates(1, guestInit(\n                appCmpntInit(todoService.appInit( todoService.getLocalStorage(this.todoService.jsonify)(todoService.lSName[1]), todoService.lSName, todoService.lSName[1])), \n                    todoService.matchAllAndDone,$event))\" >\n        </auth-wndw>\n        <m-w-del-all-done id=\"m-w-del-all-done\" class=\"animated__long\" [style.display]=\"itemVisibility ? 'block' : 'none'\" [data-messages]=\"message\" (dataItemVisibility)=\"rmTodoHandler(buffer, listItems, $event, userId);itemVisibility = $event.itemVisibility;\"></m-w-del-all-done>\n    </section>",
        providers: []
    }),
    __param(0, core_1.Inject(todos_service_1.TodosService)),
    __param(1, core_1.Inject(error_handler_service_1.ErrorHandlerService)),
    __metadata("design:paramtypes", [todos_service_1.TodosService,
        error_handler_service_1.ErrorHandlerService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=AppComponent.js.map