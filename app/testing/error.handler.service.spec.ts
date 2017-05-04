
import {
    async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';
import {ErrorHandlerService} from "../services/error.handler.service/error.handler.service";

describe('error.handler.service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ErrorHandlerService]
        });
    });
    it('1. Method handleError. Return Error: Observable ', async(inject([ErrorHandlerService],(service: ErrorHandlerService) => {
        service.handleError('test').subscribe(
            resp =>  resp,
            error => {
                expect(error).toEqual('test');
            });
    })));
    it('2.1 Method displayErrors', async(inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        let z = service.displayErrors({code: "auth/wrong-password", message: "The password is wrong."});
        expect(z).toEqual("The password is wrong.");
    })));
    it('2.2 Method displayErrors. ', async(inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        let z = service.displayErrors({code: "Some another Error", message: "Some another Error."});
        expect(z).toEqual("Some another Error.");
    })));
});
