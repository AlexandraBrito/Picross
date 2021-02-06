import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupContent } from './content/popup-content.component';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() pic: Array<Array<boolean>>;

  verticalNumbers = new Array();
  horizontalNumbers = new Array();

  calculated = new Array();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public calculateAll() {
    this.horizontalNumbers = new Array();
    this.verticalNumbers = new Array();

    this.calcHorizontal();
    this.calcVertical();
    var sizes = this.calcSize();

    this.crop(sizes);

    this.openDialog();
    console.log("horixontal         " + this.horizontalNumbers);
    console.log("hhgfdhvertical         " + this.verticalNumbers);
  }

  private calcVertical() {
    var counter = 0;
    for (var line of this.pic) {
      for (var pixel of line) {
        if (pixel)
          counter++;
        else if (counter != 0) {
          this.verticalNumbers.push(counter);
          counter = 0;
        }
      }
      if (counter != 0) {
        this.verticalNumbers.push(counter);
        counter = 0;
      }
    }
  }

  private calcHorizontal() {
    var counter = 0;
    for (var i = 0; i < this.pic.length; i++) {
      for (var j = 0; j < this.pic[0].length; j++) {
        if (this.pic[j][i])
          counter++;
        else if (counter != 0) {
          this.horizontalNumbers.push(counter);
          counter = 0;
        }
      }
      if (counter != 0) {
        this.horizontalNumbers.push(counter);
        counter = 0;
      }
    }
  }

  private calcSize() {
    var minY = this.pic.length;
    var minX = this.pic[0].length;
    var maxY = 0;
    var maxX = 0;
    for (var line = 0; line < this.pic.length; line++) {
      for (var pixel = 0; pixel < this.pic[0].length; pixel++) {
        if (this.pic[line][pixel]) {
          if (minY > pixel)
            minY = pixel;
          if (maxY < pixel)
            maxY = pixel;
          if (minX > line)
            minX = line;
          if (maxX < line)
            maxX = line;
        }
      }
    }
    return { minY: minY, maxY: maxY, minX: minX, maxX: maxX };
  }

 private crop(sizes: any) {
    this.calculated = this.pic.slice(sizes.minX, sizes.maxX + 1).map(i => i.slice(sizes.minY, sizes.maxY + 1))
  }

  openDialog() {
    this.dialog.open(PopupContent, { data: { pic: this.calculated } });
  }

}
