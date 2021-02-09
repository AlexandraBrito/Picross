import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.css']
})
export class PicComponent implements OnInit {
  @Input() pic: { isPainted: boolean, value: number }[][];
  @Input() paintable: boolean;
  @Input() calculations?: { vertical: number[][], horizontal: number[][] };

  changeTo: boolean = true;
  longPress = false;

  constructor() { }

  ngOnInit(): void {

    // if (this.calculations) {
    //   var max = 0;
    //   this.calculations.vertical.forEach(x => { if (x.length < max) max = x.length });

    // }
  }

  public onMouseDown(line: number, pixel: number) {
    this.longPress = true;
    this.changeTo = !this.pic[line][pixel].isPainted;
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp() {
    if (this.paintable) {
      this.longPress = false;
    }
  }

  public onClick(line: number, pixel: number) {
    if (this.paintable) {
      this.pic[line][pixel].isPainted = !this.pic[line][pixel].isPainted;
    }
  }

  public onOver(line: number, pixel: number) {
    if (this.paintable && this.longPress)
      this.pic[line][pixel].isPainted = this.changeTo;
  }

}
