import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public dialog: MatDialog) { }



  ngOnInit(): void {
  }

  openDialog() {

    this.dialog.open(DialogElementsExampleDialog);
  }

}

@Component({
  selector: 'popup-content',
  templateUrl: 'popup-content.html',
})
export class DialogElementsExampleDialog { }
