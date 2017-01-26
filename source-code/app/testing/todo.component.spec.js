//Copyright (c) 2016 Alex Tranchenko. All rights reserved.
//MIT License.
"use strict";
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var todo_component_1 = require("../todo/todo.component");
var todos_service_1 = require("../services/todos.service/todos.service");
var error_handler_service_1 = require("../services/error.handler.service/error.handler.service");
// import {AppComponent} from "../AppComponent";
var forms_1 = require("@angular/forms");
var fixture;
var cmpnt;
var de;
// let allTodo: AppComponent;
var todoService;
// let appComponent: AppComponent;
var delBtn;
var delFirstLi;
var AppComponentStub = {
    isChecked: true,
    todos: [{ id: 0, value: "test", done: false }, { id: 1, value: "test", done: false }],
    usrId: 'testUser',
    itemVisibility: false
};
var TodosServiceStub = {
    listItems: [{ id: 0, value: "test", done: false }, { id: 1, value: "test", done: false }]
};
describe('todos.component', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.FormsModule
            ],
            declarations: [
                todo_component_1.TodoComponent
            ],
            providers: [
                // {provide: TodosServiceStub, useValue: TodosServiceStub},
                // {provide: AppComponent, useValue: AppComponentStub},
                // {provide: ComponentFixtureAutoDetect, useValue: true},
                error_handler_service_1.ErrorHandlerService,
                todos_service_1.TodosService
            ]
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(todo_component_1.TodoComponent);
            cmpnt = fixture.componentInstance;
            fixture.detectChanges(); // initial binding
            delBtn = fixture.debugElement.query(platform_browser_1.By.css('button'));
            delFirstLi = fixture.debugElement.query(platform_browser_1.By.css('.todos__item'));
            todoService = fixture.debugElement.injector.get(todos_service_1.TodosService);
        });
        // creates an instance of TodoComponent to test and returns a fixture: ComponentFixture.
        // fixture = TestBed.createComponent(TodoComponent);
        // cmpnt = fixture.componentInstance;
        // allTodo = fixture.debugElement.injector.get(AppComponent);
        // appComponent = TestBed.get(AppComponent);
    }));
    it('1.1 method open.', testing_1.fakeAsync(function () {
        testing_1.tick();
        fixture.detectChanges();
        // fixture.whenStable().then(() => {
        var el = fixture.debugElement.query(platform_browser_1.By.css('.todos__item'));
        expect(el).toBe('');
        // expect(delBtn).toBe('');
        // expect(delFirstLi).toBe('');
        // let height = window.getComputedStyle(el, null).getPropertyValue("height");
        // expect(height).toBe('20.8px');
        // click(delFirstLi.nativeElement);
        // fixture.detectChanges();
        // height = window.getComputedStyle(el, null).getPropertyValue("height");
        // expect(height).toBe('0px');
        // });
    }));
    it('1.2 method checkTodo', function () {
        // let input = fixture.debugElement.query(By.css('input'));
        // todoService.listItems = [{id:0,value:"test",done:false}, {id:1,value:"test",done:false}];
        // appComponent.userId = 'testUser';
        // fixture.detectChanges();
        // input.triggerEventHandler('change', input.nativeElement);
        // expect(todoService).toBe('');
        // expect(appComponent).toBe('');
        // expect(input).toBe();
    });
});
//# sourceMappingURL=todo.component.spec.js.map