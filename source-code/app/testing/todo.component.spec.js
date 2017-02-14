import { async, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoComponent } from "../todo/todo.component";
import { TodosService } from "../services/todos.service/todos.service";
import { ErrorHandlerService } from "../services/error.handler.service/error.handler.service";
import { FormsModule } from "@angular/forms";
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
    listItems: [{ id: 0, value: "test1", done: false }, { id: 1, value: "test2", done: false }]
};
describe('todos.component', function () {
    beforeEach(async(function () {
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
                TodosService,
                TodoComponent
            ]
        })
            .compileComponents() // compile template and css
            .then(function () {
            fixture = TestBed.createComponent(TodoComponent);
            cmpnt = fixture.componentInstance;
            // fixture.detectChanges(); // initial binding
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
    it('1.1 method checkTodo.', (inject([TodoComponent], function (service) {
        var z = service.checkTodo(true, 1, [{ id: 0, value: "test", done: false }, { id: 1, value: "test", done: false }], 'qwert');
        console.log(z);
        // expect(service.checkTodo(true, 1, [{id:0,value:"test",done:false}, {id:1,value:"test",done:false}], 'qwert')).toBeFalsy();
    })));
    // it('1.2 method modWinDelHandler', () => {
    // let input = fixture.debugElement.query(By.css('input'));
    // todoService.listItems = [{id:0,value:"test",done:false}, {id:1,value:"test",done:false}];
    // appComponent.userId = 'testUser';
    // fixture.detectChanges();
    // input.triggerEventHandler('change', input.nativeElement);
    // expect(todoService).toBe('');
    // expect(appComponent).toBe('');
    // expect(input).toBe();
    // });
});
//# sourceMappingURL=todo.component.spec.js.map