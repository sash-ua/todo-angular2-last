"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// The browser platform with a compiler
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// The app module
var app_module_1 = require("./app.module");
core_1.enableProdMode();
// Compile and launch the module
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map