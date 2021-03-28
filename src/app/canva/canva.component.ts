import { Component, HostListener, Input } from '@angular/core';
import { CalculatedNumbers, Cell } from '../models';

@Component({
  selector: 'canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css']
})

export class CanvaComponent {
  @Input() canva: Cell[][];
  @Input() paintable: boolean;
  @Input() calculations?: CalculatedNumbers;

  changeTo: boolean = true;
  longPress = false;

  ngOnInit(): void {


    if (this.calculations) {
      const vertLines: number = Math.max(...this.calculations.horiz.map(x => x.length));
      for (var i = 0; i < this.canva.length; i++) {

        for (let x = vertLines - 1; x >= 0; x--) {
          if (this.calculations.horiz[i][x])
            this.canva[i].unshift({ value: this.calculations.horiz[i][x] });
          else this.canva[i].unshift({});
        }
      }

      while (this.calculations.vert.some(x => x.length > 0)) {
        let arrayToAdd: Cell[] = [];
        for (let i = 0; i < vertLines; i++)
          arrayToAdd.push({})
        this.calculations.vert.forEach(x => arrayToAdd.push({ value: x.pop() }));
        this.canva.unshift(arrayToAdd);
      }
    }

  }

  public onMouseDown(line: number, pixel: number) {
    this.longPress = true;
    this.changeTo = !this.canva[line][pixel].isPainted;
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp() {
    if (this.paintable) {
      this.longPress = false;
    }
  }

  public onClick(line: number, pixel: number) {
    if (this.paintable) {
      this.canva[line][pixel].isPainted = !this.canva[line][pixel].isPainted;
    }
  }

  public onOver(line: number, pixel: number) {
    if (this.paintable && this.longPress)
      this.canva[line][pixel].isPainted = this.changeTo;
  }

}
