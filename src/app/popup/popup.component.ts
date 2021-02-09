import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupContent } from './content/popup-content.component';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() pic: { isPainted?: boolean, value?: number }[][];
  newPic: { isPainted?: boolean, value?: number }[][];

  // calc: { vertical: number[][], horizontal: number[][] } = { vertical: [], horizontal: [] };



  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public calculateAll() {
    var sizes = this.calcSize();
    this.newPic = this.crop(sizes);
    // this.calc.horizontal = [];
    // this.calc.vertical = [];
    this.calcHorizontal();
    this.calcVertical();
    this.openDialog();
    // console.table(this.calc.horizontal);
  }

  private calcVertical() {
    var counter = 0;
    var numbers: number[] = [];
    for (var line of this.newPic) {
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

    //array all the same size
    var larger = 0;
    this.newPic.forEach(x => {
      if (x.length > larger)
        larger = x.length;
    });
    this.newPic.forEach(x => {
      while (x.length != larger) {
        x.unshift({});
      }
    });
  }

  private calcHorizontal() {
    var counter = 0;
    var numbers: number[] = [];
    var linesToAdd: { isPainted?: boolean, value?: number }[][] = [];


    for (var line = 0; line < this.newPic[0].length; line++) {
      for (var pixel = 0; pixel < this.newPic.length; pixel++) {
        if (this.newPic[pixel][line]?.isPainted)
          counter++;
        else if (counter != 0) {
          numbers.push(counter);
          counter = 0;
        }
        // line += numbers.length;
        // this.calc.horizontal.push(numbers);
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
    var index = 0;

    linesToAdd.reverse();

    linesToAdd.forEach(line => {


      this.newPic.unshift(line)
      // linesToAdd[line].forEach(x => this.newPic[line].unshift(x));
      // index += line + linesToAdd[line].length;

    });

    // for (var line = 0; line < linesToAdd[0].length; line++) {
    for (var pixel = 0; pixel < linesToAdd.length; pixel++) {
      if (linesToAdd[pixel])
        linesToAdd[pixel].forEach(x => this.newPic[line].unshift(x));


    }

  }

  private calcSize() {
    var minY = this.pic.length;
    var minX = this.pic[0].length;
    var maxY = 0;
    var maxX = 0;
    for (var line = 0; line < this.pic.length; line++) {
      for (var pixel = 0; pixel < this.pic[0].length; pixel++) {
        if (this.pic[line][pixel]?.isPainted) {
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
    return this.pic.slice(sizes.minX, sizes.maxX + 1).map(i => i.slice(sizes.minY, sizes.maxY + 1))
  }

  openDialog() {
    this.dialog.open(PopupContent, { data: { pic: this.newPic } });
  }

}
