import {Directive, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[track-scroll]',
    host: {'(scroll)': 'track($event)'}
})

export class TrackScrollDirective {
    track($event: Event) {
        //console.log("Scroll Event", $event);
    }
}