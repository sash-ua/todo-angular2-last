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
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { TodosService } from "../../services/todos.service/todos.service";
var TodoComponent = (function () {
    function TodoComponent(todoService) {
        this.filter = true;
        this.filterId = true;
        this.selector = '.filters__link';
        this.eventObserver = new EventEmitter();
        this.eventDeleteObserver = new EventEmitter();
        this.todoService = todoService;
    }
    // Track changes in To do List array by 'id'.
    TodoComponent.prototype.trackByTodo = function (index, todo) {
        return todo.id;
    };
    // Emit obj. with 'checkAll' state to give away it in AppComponent.
    TodoComponent.prototype.checkTodo = function (state, id, listItems, userId) {
        var lisItemLoc = this.todoService.highlightTodo(listItems, state, id);
        this.eventObserver.emit(Object.assign({ listItems: lisItemLoc }, this.todoService.changeStates(lisItemLoc, this.todoService.lSName, userId)));
    };
    // Emit objects with data to execute it in AppComponent.
    TodoComponent.prototype.modWinDelHandler = function (index, userId, el) {
        if (index === void 0) { index = null; }
        if (userId === void 0) { userId = ''; }
        if (el === void 0) { el = undefined; }
        var arr = [
            { itemVisibility: true, index: index, el: el, userId: userId, message: 'Do you wish to delete all done tasks, really?' },
            { itemVisibility: true, index: index, el: el, userId: userId, message: 'Do you wish to delete this task?' }
        ];
        if (index || index === 0) {
            // If event 'remove one to do'
            this.eventDeleteObserver.emit(arr[1]);
        }
        else {
            // If event 'remove all done todos'
            this.eventDeleteObserver.emit(arr[0]);
        }
    };
    return TodoComponent;
}());
__decorate([
    Input('data-userid'),
    __metadata("design:type", String)
], TodoComponent.prototype, "userId", void 0);
__decorate([
    Input('data-todo-list'),
    __metadata("design:type", Array)
], TodoComponent.prototype, "listItems", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TodoComponent.prototype, "eventObserver", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TodoComponent.prototype, "eventDeleteObserver", void 0);
TodoComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'all-todos',
        templateUrl: 'todo.component.html',
        providers: []
    }),
    __param(0, Inject(TodosService)),
    __metadata("design:paramtypes", [TodosService])
], TodoComponent);
export { TodoComponent };
//# sourceMappingURL=todo.component.js.map