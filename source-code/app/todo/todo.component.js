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
var todos_service_1 = require("../services/todos.service/todos.service");
var TodoComponent = (function () {
    function TodoComponent(todoService) {
        this.filter = true;
        this.filterId = true;
        this.selector = '.filters__link';
        this.eventObserver = new core_1.EventEmitter();
        this.eventDeleteObserver = new core_1.EventEmitter();
        this.todoService = todoService;
    }
    // Track changes in To do List array by 'id'.
    TodoComponent.prototype.trackByTodo = function (index, todo) {
        return todo.id;
    };
    // Emit obj. with 'checkAll' state to give away it in AppComponent.
    TodoComponent.prototype.checkTodo = function (state, id, arr, userId) {
        this.eventObserver.emit(Object.assign({ listItems: this.todoService.highlightTodo(arr, state, id) }, this.todoService.changeStates(arr, userId)));
    };
    // Prepare todos item to edit. Display edit field.
    TodoComponent.prototype.open = function (ev, todoState) {
        this.todoService.openCloseEditable(ev, todoState);
    };
    // Emit objects with data to execute it in AppComponent.
    TodoComponent.prototype.modWinDelHandler = function (index, userId, el) {
        if (index === void 0) { index = NaN; }
        if (userId === void 0) { userId = ''; }
        if (el === void 0) { el = undefined; }
        var arr = [
            // {itemVisibility: false},
            { itemVisibility: true, index: index, el: el, userId: userId, message: 'Do you wish to delete all done tasks, really?' },
            { itemVisibility: true, index: index, el: el, userId: userId, message: 'Do you wish to delete this task?' }
        ];
        if (index) {
            // If event 'remove one to do'
            this.eventDeleteObserver.emit(arr[1]);
        }
        else {
            // If event 'remove all done todos'
            this.eventDeleteObserver.emit(arr[0]);
        }
    };
    __decorate([
        core_1.Input('data-userid'), 
        __metadata('design:type', String)
    ], TodoComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Input('data-todo-list'), 
        __metadata('design:type', Array)
    ], TodoComponent.prototype, "listItems", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TodoComponent.prototype, "eventObserver", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TodoComponent.prototype, "eventDeleteObserver", void 0);
    TodoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'all-todos',
            templateUrl: 'todo.component.html',
            providers: []
        }),
        __param(0, core_1.Inject(todos_service_1.TodosService)), 
        __metadata('design:paramtypes', [todos_service_1.TodosService])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map