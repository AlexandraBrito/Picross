import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css']
})
export class CanvaComponent {
  @Input() canva: { isPainted: boolean, value: number }[][];
  @Input() paintable: boolean;
  @Input() calculations?: { vertical: number[][], horizontal: number[][] };

  changeTo: boolean = true;
  longPress = false;


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
