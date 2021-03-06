import {Component, Input} from '@angular/core';

@Component({
    selector: 'raised-button',
    template: ` <button md-raised-button class="r-brn">{{ name }}</button>`,
    styles: [`
        .r-brn {background-color: #e6e6e6; width: 127px;} 
        .r-brn:hover {background-color: #cdcdcd;}
    `],
})
export class ButtonRaised {
    @Input('raised-button-name') name: string;
}


@Component({
    selector: 'flat-button',
    template: ` <button md-button class="r-brn">{{ name }}</button>`,
    styles: [`.r-brn {background-color: #e6e6e6;} .r-brn:hover {background-color: #cdcdcd;}`],
})
export class ButtonFlat {
    @Input('raised-button-name') name: string;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.