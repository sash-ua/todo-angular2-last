import {Component, Inject, Input, Output, EventEmitter} from '@angular/core';
import {TodosService} from "../services/todos.service/todos.service";
import {ListItem} from "./list.item";

@Component({
    moduleId: module.id,
    selector: 'all-todos',
    templateUrl: 'todo.component.html',
    providers: []
})
export class TodoComponent {
    private todo: any;
    private todoService: any;
    private filter = true;
    private filterId = true;
    private selector: string = '.filters__link';

    constructor(
        @Inject(TodosService) todoService: TodosService,
    ) {
        this.todoService = todoService;
    }

    @Input('data-userid') userId: string;
    @Input('data-todo-list') listItems: ListItem[];
    @Output() eventObserver: EventEmitter<any> = new EventEmitter();
    @Output() eventDeleteObserver: EventEmitter<any> = new EventEmitter();

    // Track changes in To do List array by 'id'.
    trackByTodo(index: number, todo: ListItem): any {
        return todo.id;
    }
    // Emit obj. with 'checkAll' state to give away it in AppComponent.
    checkTodo(state: boolean, id: number, arr: ListItem[], userId?: string): void {
        this.eventObserver.emit(Object.assign({listItems: this.todoService.highlightTodo(arr, state, id)}, this.todoService.changeStates(arr, userId)));
    }
    // Prepare todos item to edit. Display edit field.
    open(ev: Event, todoState: boolean){
        this.todoService.openCloseEditable(ev, todoState);
    }
    // Emit objects with data to execute it in AppComponent.
    modWinDelHandler(index: number = NaN, userId: string = '', el: HTMLElement = undefined){
        const arr: Array<any> = [
            // {itemVisibility: false},
            {itemVisibility: true, index: index, el: el, userId: userId, message: 'Do you wish to delete all done tasks, really?'},
            {itemVisibility: true, index: index, el: el, userId: userId, message: 'Do you wish to delete this task?'}
        ];
        if(index){
            // If event 'remove one to do'
            this.eventDeleteObserver.emit( arr[1] );
        } else {
            // If event 'remove all done todos'
            this.eventDeleteObserver.emit( arr[0] );
        }
    }
}