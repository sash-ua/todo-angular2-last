import {
    Injectable, trigger, state, style, transition, animate,
    AnimationEntryMetadata
} from '@angular/core';
import {AnimationT} from "../../types/types";

@Injectable()
export class AnimationsService {
    constructor() { }
    static animaton(name: string, strt: AnimationT, next: AnimationT): AnimationEntryMetadata{
        return trigger(name,[
            state('active', style(strt)),
            state('inactive', style(next)),
            transition('* <=> *', [
                animate(300)
            ])])
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.