//Copyright (c) 2016 Alex Tranchenko. All rights reserved.
//MIT License.

import {
    async, ComponentFixture, fakeAsync, inject, TestBed, tick, ComponentFixtureAutoDetect
} from '@angular/core/testing';
import {DebugElement} from "@angular/core";
import { By } from '@angular/platform-browser';
import {TodoComponent} from "../todo/todo.component";
import {TodosService} from "../services/todos.service/todos.service";
import {ErrorHandlerService} from "../services/error.handler.service/error.handler.service";
// import {AppComponent} from "../AppComponent";
import {FormsModule} from "@angular/forms";
import {click} from "./index";

let fixture: ComponentFixture<TodoComponent>;
let cmpnt: TodoComponent;
let de: DebugElement;
// let allTodo: AppComponent;
let todoService: TodosService;
// let appComponent: AppComponent;
let delBtn: DebugElement;
let delFirstLi: DebugElement;
let AppComponentStub = {
    isChecked: true,
    todos: [{id:0,value:"test",done:false}, {id:1,value:"test",done:false}],
    usrId: 'testUser',
    itemVisibility: false
};
let TodosServiceStub = {
    listItems: [{id:0,value:"test",done:false}, {id:1,value:"test",done:false}]
};

describe('todos.component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                TodoComponent
            ],
            providers: [
                // {provide: TodosServiceStub, useValue: TodosServiceStub},
                // {provide: AppComponent, useValue: AppComponentStub},
                // {provide: ComponentFixtureAutoDetect, useValue: true},
                ErrorHandlerService,
                TodosService
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TodoComponent);
                cmpnt    = fixture.componentInstance;
                fixture.detectChanges(); // initial binding
                delBtn = fixture.debugElement.query(By.css('button'));
                delFirstLi = fixture.debugElement.query(By.css('.todos__item'));
                todoService = fixture.debugElement.injector.get(TodosService);
            });
        // creates an instance of TodoComponent to test and returns a fixture: ComponentFixture.
        // fixture = TestBed.createComponent(TodoComponent);
        // cmpnt = fixture.componentInstance;

        // allTodo = fixture.debugElement.injector.get(AppComponent);
        // appComponent = TestBed.get(AppComponent);

    }));
    it('1.1 method open.', fakeAsync(() => {
        tick();
        fixture.detectChanges();
        // fixture.whenStable().then(() => {
            let el = fixture.debugElement.query(By.css('.todos__item'));
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
    it('1.2 method checkTodo', () => {
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