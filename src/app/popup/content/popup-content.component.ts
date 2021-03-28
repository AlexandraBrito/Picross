import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalculatedNumbers, Cell } from 'src/app/models';

export interface DialogData {
    canva: Cell[][];
    calc: CalculatedNumbers[][];
}


@Component({
    selector: 'popup-content',
    templateUrl: 'popup-content.html',
})
export class PopupContent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
