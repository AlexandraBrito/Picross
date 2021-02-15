import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupContent } from './content/popup-content.component';


@Component({
  selector: 'popup',
  templateUrl: './popup.component.html'

})
export class PopupComponent implements OnInit {

  @Input() canva: { isPainted?: boolean, value?: number }[][];
  newCanva: { isPainted?: boolean, value?: number }[][];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public calculateAll() {
    var sizes = this.calcSize();
    this.newCanva = this.crop(sizes);
    this.calc();
    // this.calcHorizontal();
    // this.calcVertical();

    this.openDialog();
  }


  private calc() {
    var xNumbers: { value: number }[][] = [];
    var xIndex = 0;
    var yNumbers: { value: number }[][] = [];
    var yIndex = 0;
    yNumbers[0] = [];
    xNumbers[0] = [];
    xNumbers[0][0] = { value: 0 };
    yNumbers[0][0] = { value: 0 };

    for (var x = 0; x < this.newCanva.length; x++) {
      xNumbers[x] = [];
      xIndex = 0;
      for (var y = 0; y < this.newCanva[0].length; y++) {

        if (this.newCanva[x][y]?.isPainted) {
          if (xNumbers[x][xIndex] == undefined) { xNumbers[x][xIndex] = { value: 0 }; }
          xNumbers[x][xIndex].value++;

          if (yNumbers[yIndex][y] == undefined) { yNumbers[yIndex][y] = { value: 0 }; }
          yNumbers[yIndex][y].value++;
        }
        else {
          xIndex++;
        }
      }
    }

    for (var i = 0; i < this.newCanva.length; i++) {
      xNumbers[i].reverse();
      xNumbers[i].forEach(x => this.newCanva[i].unshift(x));
    }
  }


  private calcHorizontal() {
    var counter = 0;
    var numbers: number[] = [];
    var linesToAdd: { isPainted?: boolean, value?: number }[][] = [];

    for (var line = 0; line < this.newCanva[0].length; line++) {
      for (var pixel = 0; pixel < this.newCanva.length; pixel++) {
        if (this.newCanva[pixel][line]?.isPainted)
          counter++;
        else if (counter != 0) {
          numbers.push(counter);
          counter = 0;
        }
      }
      if (counter != 0) {
        numbers.push(counter);
        counter = 0;
      }
      if (numbers.length > 0) {
        linesToAdd[line] = [];
        numbers.forEach(x => {
          linesToAdd[line].unshift({ value: x })
        });
        numbers = [];
      }

    }
    linesToAdd.reverse();
    linesToAdd.forEach(line => {
      this.newCanva.unshift(line)
    });
    for (var pixel = 0; pixel < linesToAdd.length; pixel++) {
      if (linesToAdd[pixel])
        linesToAdd[pixel].forEach(x => this.newCanva[line].unshift(x));
    }
  }

  private calcVertical() {
    var counter = 0;
    var numbers: number[] = [];
    for (var line of this.newCanva) {
      for (var pixel of line) {
        if (pixel.isPainted)
          counter++;
        else if (counter != 0) {
          numbers.push(counter);
          counter = 0;
        }
      }
      if (counter != 0) {
        numbers.push(counter);
        counter = 0;
      }
      if (numbers.length > 0) {
        numbers.reverse();
        numbers.forEach(x => line.unshift({ value: x }))
        numbers = [];
      }
    }
    var larger = 0;
    this.newCanva.forEach(x => {
      if (x.length > larger)
        larger = x.length;
    });
    this.newCanva.forEach(x => {
      while (x.length != larger) {
        x.unshift({});
      }
    });
  }

  private calcSize() {
    var minY = this.canva.length;
    var minX = this.canva[0].length;
    var maxY = 0;
    var maxX = 0;
    for (var line = 0; line < this.canva.length; line++) {
      for (var pixel = 0; pixel < this.canva[0].length; pixel++) {
        if (this.canva[line][pixel]?.isPainted) {
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

  private crop(sizes: any): { isPainted?: boolean, value?: number }[][] {
    return this.canva.slice(sizes.minX, sizes.maxX + 1).map(i => i.slice(sizes.minY, sizes.maxY + 1))
  }

  openDialog() {
    this.dialog.open(PopupContent, { data: { canva: this.newCanva } });
  }

}
