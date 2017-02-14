import {Component, DebugElement, OnInit, Inject, Input, trigger, state, style, transition, animate} from '@angular/core';
import {
    async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {ErrorHandlerService} from "../services/error.handler.service/error.handler.service";
import {TodosService} from "../services/todos.service/todos.service";
import 'firebase/database';
import {ListItem} from "../types/listItem/list.item";
import {click, newEvent} from "./index";

let testObj = [{id:0,value:"test",done:true}];
let testObjLong = [{id:0,value:"test",done:true}, {id:1,value:"test",done:false}];
const testJsonStr = '[{"id":0,"value":"test","done":true}]';
const testJsonStrEmpty = '[]';
const testKey = 'guest_todos';
const iserId = 'sdfggfds';

let comp: TestHtmlComponents;
let fixture: ComponentFixture<TestHtmlComponents>;
let de: DebugElement;
let el: HTMLElement;
let deWithChildren: DebugElement;
let elWithChildren: HTMLElement;
let spy: jasmine.Spy;
let todosService: TodosService;
const sel: string = '.filters__link';

@Component({
    styles: ['.hide{overflow: hidden; height: 100px}', '.act{color: red;}'],
    template: `
    <h2>Something</h2>
    <h2>The Default</h2>
    <input value="test"/>
    <div class="parent">
        <div class="hide">
            <p>test</p>
        </div>
        <div class="filters__link">2</div>
        <div>3</div>
    </div>`
})
export class TestHtmlComponents {
    someFunc(ev: Event) {}
}

describe('todos.service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorHandlerService ,
                TodosService
            ],
            declarations: [TestHtmlComponents]
        });
        // create component and test fixture
        fixture = TestBed.createComponent(TestHtmlComponents);
        comp = fixture.componentInstance; // TestHtmlComponents test instance
        // query for the title <p> by CSS element selector
        de = fixture.debugElement.query(By.css('p'));
        el = de.nativeElement;
        deWithChildren = fixture.debugElement.query(By.css('.parent'));
        elWithChildren = deWithChildren.nativeElement;
    });
    it('1.1 method jsonify', (inject([TodosService], (service: TodosService) => {
        expect(service.jsonify(testJsonStr)).toEqual(testObj);
        expect(service.jsonify(testObj)).toEqual(testJsonStr);
    })));
    it('1.2-3 methods setLocalStorage & getLocalStorage', (inject([TodosService], (service: TodosService) => {
        service.setLocalStorage(testObj);
        expect(service.getLocalStorage(testKey)).toBe(testJsonStr);
    })));
    it('1.4 method clearLocalStorage', (inject([TodosService], (service: TodosService) => {
        service.setLocalStorage(testObj);
        service.clearLocalStorage([testKey]);
        expect(service.getLocalStorage(testKey)).toBeNull();
    })));
    it('1.6.1 method simpleJsonObjValid', (inject([TodosService], (service: TodosService) => {
        expect(service.simpleJsonObjValid(testObj)).toBeTruthy();
    })));
    it('1.6.2 method simpleJsonObjValid', (inject([TodosService], (service: TodosService) => {
        expect(service.simpleJsonObjValid(testKey)).toBeFalsy();
    })));
    it('1.7.1 method appInit', (inject([TodosService], (service: TodosService) => {
        expect(service.appInit(testJsonStr, this.userId)).toEqual([[{id:0,value:"test",done:true}], true]);
        expect(service.appInit(testJsonStrEmpty)).toEqual([[], false]);
    })));
    // it('1.7.2 method appInit', (inject([TodosService], (service: TodosService) => {
    //     service.appInit(testJsonStr);
    //     expect(service.listItems).toEqual(testObj);
    // })));
    // it('1.7.3 method appInit', (inject([TodosService], (service: TodosService) => {
    //     service.appInit(testJsonStrEmpty);
    //     expect(service.listItems).toEqual([]);
    // })));
    // it('1.8 method counter', (inject([TodosService], (service: TodosService) => {
    //     service.id = 2;
    //     expect(service.counter()).toEqual(2);
    // })));
    it('1.8 method addItem', (inject([TodosService], (service: TodosService) => {
        let arr: Array<ListItem> = [];
        expect(service.addItem(testKey, arr)).toContain({id: 0, value: testKey, done: false});
    })));
    it('1.9 method changeStates', (inject([TodosService], (service: TodosService) => {
        expect(service.changeStates([{id:0,value:"test",done:true}, {id:1,value:"test",done:false}])).toEqual({isChecked: false, hide: false, isHidden: true, quantityTodos: 2});
    })));
    it('1.10 method inputValidation', (inject([TodosService], (service: TodosService) => {
        expect(service.inputValidation('       ')).toBeFalsy();
        expect(service.inputValidation(testKey)).toBeTruthy();
    })));
    it('1.11.1 method highlightTodo', (inject([TodosService], (service: TodosService) => {
        let z =[{id:0,value:"test",done:true}];
        service.highlightTodo(z, false);
        expect(z).toEqual([{id:0,value:"test",done:false}]);
    })));
    it('1.11.2 method highlightTodo', (inject([TodosService], (service: TodosService) => {
        let z = [{id:0,value:"test",done:false}];
        service.highlightTodo(z, true);
        expect(z).toEqual([{id:0,value:"test",done:true}]);
    })));
    it('1.11.3 method highlightTodo', (inject([TodosService], (service: TodosService) => {
        let z = [{id:0,value:"test",done:false}, {id:1,value:"test",done:false}];
        service.highlightTodo(z, true, 1);
        expect(z).toEqual([{id:0,value:"test",done:false}, {id:1,value:"test",done:true}]);
    })));
    it('1.12 method edit (value=\'    \')', (inject([TodosService], (service: TodosService) => {
        expect(service.edit(el, 0, '     ', testObj)).toBeFalsy();
    })));
    it('1.12-13 method edit & hideEl', (inject([TodosService], (service: TodosService) => {
        service.edit(el, 0, testKey, testObj);
        let z = window.getComputedStyle(el.parentNode, null).getPropertyValue("height");
        expect(z).toEqual('0px');
    })));
    it('1.14 method removeTodo', (inject([TodosService], (service: TodosService) => {
        let z = [{id:0,value:"test",done:true}];
        service.removeTodo(z, 0);
        expect(z).toEqual([]);
    })));
    it('1.15 method matchAllAndDone, all objects have keys done: false', (inject([TodosService], (service: TodosService) => {
        expect(service.matchAllAndDone(testObjLong)).toBeFalsy();
        expect(service.matchAllAndDone([{id:0,value:"test",done:false}, {id:1,value:"test",done:false}])).toBeFalsy();
        expect(service.matchAllAndDone([{id:0,value:"test",done: true}, {id:1,value:"test",done: true}])).toBeTruthy();
    })));
    it('1.16.1 method openCloseEditable, one of needed spec, another specs 1.1 todos.component specs', (inject([TodosService], (service: TodosService) => {
        let event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        expect(service.openCloseEditable(event, true)).toBeFalsy();
    })));
    it('1.17 method hightlightFilter', (inject([TodosService], (service: TodosService) => {
        let z: HTMLElement = fixture.debugElement.query(By.css(sel)).nativeElement;
        service.hightlightFilter(z, sel);
        fixture.detectChanges();
        let n: HTMLElement = fixture.debugElement.query(By.css('.act')).nativeElement;
        expect(n).toBeTruthy();
    })));
});