import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalculatedNumbers, Cell } from '../models';
import { PopupContent } from './content/popup-content.component';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html'

})

export class PopupComponent {

  @Input() canva: Cell[][];
  newCanva: Cell[][];
  CalcNums: CalculatedNumbers = {
    horiz: [],
    vert: []
  };

  constructor(public dialog: MatDialog) { }

  public calculateAll() {
    this.CalcNums = {
      horiz: [],
      vert: []
    }
    var sizes = this.calcSize();
    this.newCanva = this.crop(sizes);
    this.calc();
    this.openDialog();
  }

  private calc() {

    var yIndex = 0;
    for (var x = 0; x < this.newCanva.length; x++) {
      this.CalcNums.horiz[x] = [];
      var xIndex = 0;
      for (var y = 0; y < this.newCanva[0].length; y++) {
        this.CalcNums.vert[y] = [];

        //calculate Horizontal Numbers
        if (this.newCanva[x][y]?.isPainted == true) {
          if (this.newCanva[x][y-1]?.isPainted == false)
            xIndex++;
          if (this.CalcNums.horiz[x][xIndex] == undefined) {
            this.CalcNums.horiz[x][xIndex] = 0;
          }
          this.CalcNums.horiz[x][xIndex]++;

          //calculate Vertical Numbers
          if (this.newCanva[x - 1][y]?.isPainted == false)
            yIndex++;
          if (
            this.CalcNums.vert[y] == undefined) {

            this.CalcNums.vert[y] = [];
          }
          if (
            this.CalcNums.vert[y][yIndex] == undefined) {

            this.CalcNums.vert[y][yIndex] = 0;
          }

          this.CalcNums.vert[y][yIndex]++;
        } 
      }
    }
    // this.removeEmpty()
  }

  private removeEmpty() {
    this.CalcNums.vert = this.CalcNums.vert.filter(item => item);
    this.CalcNums.horiz = this.CalcNums.horiz.filter(item => item);
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

  private crop(sizes: any): Cell[][] {
    return this.canva.slice(sizes.minX, sizes.maxX + 1).map(i => i.slice(sizes.minY, sizes.maxY + 1))
  }

  openDialog() {
    this.dialog.open(PopupContent, { data: { canva: this.newCanva, calc: this.CalcNums } });
  }

}
