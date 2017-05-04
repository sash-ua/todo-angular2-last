import {Component, Output, EventEmitter, Input} from '@angular/core';
import {RmOrNot} from "../../types/types";

@Component({
    selector: 'm-w-del-all-done',
    template: `
    <cap></cap>
    <div class="modal-window">
        <h2 class="modal-window__header">{{ message }}</h2>
        <div class="modal-window__buttons">
            <flat-button (click)="this.dataItemVisibility.emit({itemVisibility: false})" (mouseenter)="cancelRed = true" (mouseleave)="cancelRed = false" 
                    [style.color]="cancelRed ? 'red' : '#000'" class="modal-window__btn filters__button filters__link animated" [raised-button-name]="'No'"></flat-button>
            <raised-button (click)="this.dataItemVisibility.emit({itemVisibility: false, rmDone: true})" (mouseenter)="delRed = true" (mouseleave)="delRed = false" 
                    [style.color]="delRed ? 'red' : '#000'" id="del-all-completed" class="modal-window__btn filters__button filters__link animated" 
                    [raised-button-name]="'Yes'"></raised-button>
        </div>
    </div>`
})
export class ModalWindowComponent {
    itemVisibility: boolean;
    private delRed: boolean;

    constructor() {}

    @Input('data-messages') message: string;
    @Output() dataItemVisibility: EventEmitter<RmOrNot> = new EventEmitter();
}