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
/**
 * Created by Alex Tranchenko on 18.11.2016.
 */
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var error_handler_service_1 = require("../services/error.handler.service/error.handler.service");
var todos_service_1 = require("../services/todos.service/todos.service");
require('firebase/database');
var testObj = [{ id: 0, value: "test", done: true }];
var testObjLong = [{ id: 0, value: "test", done: true }, { id: 1, value: "test", done: false }];
var testJsonStr = '[{"id":0,"value":"test","done":true}]';
var testJsonStrEmpty = '[]';
var testKey = 'guest_todos';
var comp;
var fixture;
var de;
var el;
var deWithChildren;
var elWithChildren;
var spy;
var todosService;
var sel = '.filters__link';
var TestHtmlComponents = (function () {
    function TestHtmlComponents() {
    }
    TestHtmlComponents.prototype.someFunc = function (ev) { };
    TestHtmlComponents = __decorate([
        core_1.Component({
            styles: ['.hide{overflow: hidden; height: 100px}', '.act{color: red;}'],
            template: "\n    <h2>Something</h2>\n    <h2>The Default</h2>\n    <input value=\"test\"/>\n    <div class=\"parent\">\n        <div class=\"hide\">\n            <p>test</p>\n        </div>\n        <div class=\"filters__link\">2</div>\n        <div>3</div>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestHtmlComponents);
    return TestHtmlComponents;
}());
exports.TestHtmlComponents = TestHtmlComponents;
describe('todos.service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                error_handler_service_1.ErrorHandlerService,
                todos_service_1.TodosService
            ],
            declarations: [TestHtmlComponents]
        });
        // create component and test fixture
        fixture = testing_1.TestBed.createComponent(TestHtmlComponents);
        comp = fixture.componentInstance; // TestHtmlComponents test instance
        // query for the title <p> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('p'));
        el = de.nativeElement;
        deWithChildren = fixture.debugElement.query(platform_browser_1.By.css('.parent'));
        elWithChildren = deWithChildren.nativeElement;
    });
    it('1.1 method jsonify', (testing_1.inject([todos_service_1.TodosService], function (service) {
        expect(service.jsonify(testJsonStr)).toEqual(testObj);
        expect(service.jsonify(testObj)).toEqual(testJsonStr);
    })));
    it('1.2-3 methods setLocalStorage & getLocalStorage', (testing_1.inject([todos_service_1.TodosService], function (service) {
        service.setLocalStorage(testObj);
        expect(service.getLocalStorage(testKey)).toBe(testJsonStr);
    })));
    it('1.4 method clearLocalStorage', (testing_1.inject([todos_service_1.TodosService], function (service) {
        service.setLocalStorage(testObj);
        service.clearLocalStorage([testKey]);
        expect(service.getLocalStorage(testKey)).toBeNull();
    })));
    it('1.6.1 method simpleJsonObjValid', (testing_1.inject([todos_service_1.TodosService], function (service) {
        expect(service.simpleJsonObjValid(testObj)).toBeTruthy();
    })));
    it('1.6.2 method simpleJsonObjValid', (testing_1.inject([todos_service_1.TodosService], function (service) {
        expect(service.simpleJsonObjValid(testKey)).toBeFalsy();
    })));
    it('1.7.1 method appInit', (testing_1.inject([todos_service_1.TodosService], function (service) {
        expect(service.appInit(testJsonStr)).toBeTruthy();
        expect(service.appInit(testJsonStrEmpty)).toBeFalsy();
    })));
    it('1.7.2 method appInit', (testing_1.inject([todos_service_1.TodosService], function (service) {
        service.appInit(testJsonStr);
        expect(service.listItems).toEqual(testObj);
    })));
    it('1.7.3 method appInit', (testing_1.inject([todos_service_1.TodosService], function (service) {
        service.appInit(testJsonStrEmpty);
        expect(service.listItems).toEqual([]);
    })));
    it('1.8 method counter', (testing_1.inject([todos_service_1.TodosService], function (service) {
        service.id = 2;
        expect(service.counter()).toEqual(2);
    })));
    it('1.9 method addItem', (testing_1.inject([todos_service_1.TodosService], function (service) {
        service.id = 1;
        var arr = [];
        service.counter();
        service.addItem(testKey, arr);
        expect(arr).toContain({ id: 2, value: testKey, done: false });
    })));
    it('1.10 method changeStates', (testing_1.inject([todos_service_1.TodosService], function (service) {
        var states = [true, false, false, 1];
        expect(service.changeStates(states, [{ id: 0, value: "test", done: true }])).toEqual([true, false, true, 1]);
    })));
    it('1.12 method inputValidation', (testing_1.inject([todos_service_1.TodosService], function (service) {
        expect(service.inputValidation('       ')).toBeFalsy();
        expect(service.inputValidation(testKey)).toBeTruthy();
    })));
    it('1.13.1 method highlightTodo', (testing_1.inject([todos_service_1.TodosService], function (service) {
        var z = [{ id: 0, value: "test", done: true }];
        service.highlightTodo(z, false);
        expect(z).toEqual([{ id: 0, value: "test", done: false }]);
    })));
    it('1.13.2 method highlightTodo', (testing_1.inject([todos_service_1.TodosService], function (service) {
        var z = [{ id: 0, value: "test", done: false }];
        service.highlightTodo(z, true);
        expect(z).toEqual([{ id: 0, value: "test", done: true }]);
    })));
    it('1.13.3 method highlightTodo', (testing_1.inject([todos_service_1.TodosService], function (service) {
        var z = [{ id: 0, value: "test", done: false }, { id: 1, value: "test", done: false }];
        service.highlightTodo(z, true, 1);
        expect(z).toEqual([{ id: 0, value: "test", done: false }, { id: 1, value: "test", done: true }]);
    })));
    it('1.14 method edit (value=\'    \')', (testing_1.inject([todos_service_1.TodosService], function (service) {
        expect(service.edit(el, 0, '     ', testObj)).toBeFalsy();
    })));
    it('1.14-15 method edit & hideEl', (testing_1.inject([todos_service_1.TodosService], function (service) {
        service.edit(el, 0, testKey, testObj);
        var z = window.getComputedStyle(el.parentNode, null).getPropertyValue("height");
        expect(z).toEqual('0px');
    })));
    it('1.16 method removeTodo', (testing_1.inject([todos_service_1.TodosService], function (service) {
        var z = [{ id: 0, value: "test", done: true }];
        service.removeTodo(z, 0);
        expect(z).toEqual([]);
    })));
    it('1.18 method matchAllAndDone, all objects have keys done: false', (testing_1.inject([todos_service_1.TodosService], function (service) {
        expect(service.matchAllAndDone(testObjLong)).toBeFalsy();
        expect(service.matchAllAndDone([{ id: 0, value: "test", done: false }, { id: 1, value: "test", done: false }])).toBeFalsy();
        expect(service.matchAllAndDone([{ id: 0, value: "test", done: true }, { id: 1, value: "test", done: true }])).toBeTruthy();
    })));
    it('1.20.1 method openCloseEditable, one of needed spec, another specs 1.1 todos.component specs', (testing_1.inject([todos_service_1.TodosService], function (service) {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        expect(service.openCloseEditable(event, true)).toBeFalsy();
    })));
    it('1.21 method hightlightFilter', (testing_1.inject([todos_service_1.TodosService], function (service) {
        var z = fixture.debugElement.query(platform_browser_1.By.css(sel)).nativeElement;
        service.hightlightFilter(z, sel);
        fixture.detectChanges();
        var n = fixture.debugElement.query(platform_browser_1.By.css('.act')).nativeElement;
        expect(n).toBeTruthy();
    })));
});
//# sourceMappingURL=todos.service.spec.js.map