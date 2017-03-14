import {HammerGestureConfig} from "@angular/platform-browser";

export class HammerConfig extends HammerGestureConfig {
    // overrides default settings
    buildHammer(element: HTMLElement) {
        delete Hammer.defaults.cssProps.userSelect;
        return new Hammer.Manager(element, {
            recognizers: [
                [Hammer.Swipe,{ direction: Hammer.DIRECTION_RIGHT, velocity: 0.30, threshold: 70 }],
            ]
        });
    }
}


//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.