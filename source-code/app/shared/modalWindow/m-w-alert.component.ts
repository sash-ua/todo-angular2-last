import {Component, Input} from '@angular/core';
import {AnimationsService} from "../../services/animations.service/animations.service";

@Component({
    selector: 'm-w-alert',
    template: `
    <div [@openHide]="alerts"  class="modal-window modal-window_alerts">
        <h4 class="modal-window__header">{{this.message}}</h4>
    </div>`,
    animations: [
        AnimationsService.animaton('openHide', {height: 'auto', opacity: 1},{height: '0%', opacity: 0})
    ],
    providers: [
        AnimationsService
    ]
})
export class MWAlertComponent {
    constructor() { }
    @Input('data-id') message: string;
    @Input('data-bind') alerts: string;
}