import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    pic: any;
    calc: any;
}


@Component({
    selector: 'popup-content',
    templateUrl: 'popup-content.html',
})
export class PopupContent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
