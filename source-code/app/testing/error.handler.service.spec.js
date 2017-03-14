import { async, inject, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from "../services/error.handler.service/error.handler.service";
describe('error.handler.service', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ErrorHandlerService]
        });
    });
    it('1. Method handleError. Return Error: Observable ', async(inject([ErrorHandlerService], function (service) {
        service.handleError('test').subscribe(function (resp) { return resp; }, function (error) {
            expect(error).toEqual('test');
        });
    })));
    it('2.1 Method displayErrors', async(inject([ErrorHandlerService], function (service) {
        var z = service.displayErrors({ code: "auth/wrong-password", message: "The password is wrong." });
        expect(z).toEqual("The password is wrong.");
    })));
    it('2.2 Method displayErrors. ', async(inject([ErrorHandlerService], function (service) {
        var z = service.displayErrors({ code: "Some another Error", message: "Some another Error." });
        expect(z).toEqual("Some another Error.");
    })));
});
//# sourceMappingURL=error.handler.service.spec.js.map