import {Component, DebugElement} from '@angular/core';
import {
    async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {ErrorHandlerService} from "../services/error.handler.service/error.handler.service";
import {TodosService} from "../services/todos.service/todos.service";
import 'firebase/database';
import {ListItem} from "../types/listItem/list.item";
import {click, newEvent} from "./index";
import {AuthService} from "../services/auth/auth.service";

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
    constructor(private tds: TodosService, private auth: AuthService){}
    f1(iserId: string) {
        return this.tds.getData(iserId);
    }
    f2(data: JSON, userId: string){
        return this.tds.setData(data, userId);
    }
}

describe('todos.service. Isolate tests', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHtmlComponents],
            providers: [
                ErrorHandlerService ,
                TodosService
            ]
        });
        // create component and test fixture
        fixture = TestBed.createComponent(TestHtmlComponents);
        comp = fixture.componentInstance; // TestHtmlComponents' test instance
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
        service.setLocalStorage(testObj, service.lSName, testKey);
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual(testObj);
        service.clearLocalStorage([testKey]);
        service.setLocalStorage(testObj, service.lSName);
        expect(service.getLocalStorage(service.jsonify)(service.lSName[1])).toEqual(testObj);
        service.clearLocalStorage([service.lSName[1]]);
    })));
    it('1.4 method clearLocalStorage', (inject([TodosService], (service: TodosService) => {
        service.setLocalStorage(testObj, service.lSName, testKey);
        service.clearLocalStorage([testKey]);
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual('null');
    })));
    it('1.6 method simpleJsonObjValid', (inject([TodosService], (service: TodosService) => {
        expect(service.simpleJsonObjValid(testObj)).toBeTruthy();
        expect(service.simpleJsonObjValid(testKey)).toBeFalsy();
    })));
    it('1.7.0 method appInit', (inject([TodosService], (service: TodosService) => {
        let z = service.appInit(testObj, service.lSName, testKey);
        expect(z).toEqual([[{id:0,value:"test",done:true}], true]);
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual(z[0]);
        service.clearLocalStorage([testKey]);
    })));
    it('1.7.1 method appInit', (inject([TodosService], (service: TodosService) => {
        let z = service.appInit(testJsonStrEmpty, service.lSName, testKey);
        expect(z).toEqual([[], false]);
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual([]);
        service.clearLocalStorage([testKey]);
    })));
    it('1.8 method addItem', (inject([TodosService], (service: TodosService) => {
        let arr: Array<ListItem> = [];
        expect(service.addItem(testKey, arr)).toContain({id: 0, value: testKey, done: false});
    })));
    it('1.9.0 method changeStates', (inject([TodosService], (service: TodosService) => {
        let obj: ListItem[] = [{id:0,value:"test",done:true}, {id:1,value:"test",done:false}];
        let z = service.changeStates(obj, service.lSName, testKey);
        expect(z).toEqual({isChecked: false, hide: false, isHidden: true, quantityTodos: 2});
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual(obj);
        service.clearLocalStorage([testKey]);
    })));
    it('1.9.1 method changeStates', (inject([TodosService], (service: TodosService) => {
        let obj: Array<any> = [];
        let z = service.changeStates(obj, service.lSName, testKey);
        expect(z).toEqual({isChecked: false, hide: true, isHidden: false, quantityTodos: 0});
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual(obj);
        service.clearLocalStorage([testKey]);
    })));
    it('1.9.2 method changeStates', (inject([TodosService], (service: TodosService) => {
        let obj: ListItem[] = [{id:0,value:"test",done:true}, {id:1,value:"test",done:true}];
        let z = service.changeStates(obj, service.lSName, testKey);
        expect(z).toEqual({isChecked: true, hide: false, isHidden: true, quantityTodos: 2});
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual(obj);
        service.clearLocalStorage([testKey]);
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
    it('1.12.0 method edit', (inject([TodosService], (service: TodosService) => {
        let obj = [{id:0,value:"test",done:false}, {id:1,value:"test",done:true}];
        expect(service.edit(el, 0, '       ', obj, service.lSName, testKey)).toBeFalsy();
        service.clearLocalStorage([testKey]);
    })));
    it('1.12-13 method edit & hideEl', (inject([TodosService], (service: TodosService) => {
        let obj = [{id:0,value:"test",done:false}, {id:1,value:"test",done:true}];
        // before launch of hideEl height == 100px
        expect(window.getComputedStyle(el.parentNode, null).getPropertyValue("height")).toEqual('100px');
        service.edit(el, 0, 'newTest', obj, service.lSName, testKey);
        expect(service.getLocalStorage(service.jsonify)(testKey)).toEqual([{id:0,value:"newTest",done:false}, {id:1,value:"test",done:true}]);
        // after launch of hideEl height should be 0px
        expect(window.getComputedStyle(el.parentNode, null).getPropertyValue("height")).toEqual('0px');
        service.clearLocalStorage([testKey]);
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
    it('1.16 method openCloseEditable, one of needed spec, another specs 1.1 todos.component specs', (inject([TodosService], (service: TodosService) => {
        let event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        expect(service.openCloseEditable(event, true)).toBeFalsy();
    })));
});