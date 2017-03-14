"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var error_handler_service_1 = require("../services/error.handler.service/error.handler.service");
describe('error.handler.service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [error_handler_service_1.ErrorHandlerService]
        });
    });
    it('1. Method handleError. Return Error: Observable ', testing_1.async(testing_1.inject([error_handler_service_1.ErrorHandlerService], function (service) {
        service.handleError('test').subscribe(function (resp) { return resp; }, function (error) {
            expect(error).toEqual('test');
        });
    })));
    it('2.1 Method displayErrors', testing_1.async(testing_1.inject([error_handler_service_1.ErrorHandlerService], function (service) {
        var z = service.displayErrors({ code: "auth/wrong-password", message: "The password is wrong." });
        expect(z).toEqual("The password is wrong.");
    })));
    it('2.2 Method displayErrors. ', testing_1.async(testing_1.inject([error_handler_service_1.ErrorHandlerService], function (service) {
        var z = service.displayErrors({ code: "Some another Error", message: "Some another Error." });
        expect(z).toEqual("Some another Error.");
    })));
});
//# sourceMappingURL=error.handler.service.spec.js.map