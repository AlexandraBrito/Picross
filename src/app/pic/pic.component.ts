import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.css']
})
export class PicComponent implements OnInit {
  @Input() pic;
  @Input() paintable: Boolean;
  changeTo: boolean = true;
  longPress = false;
  verticalNumbers = new Array();
  horizontalNumbers = new Array();

  constructor() { }

  ngOnInit(): void {
  }

  public onMouseDown(line: number, pixel: number) {
    this.longPress = true;
    this.changeTo = !this.pic[line][pixel];
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp() {
    this.longPress = false;
  }

  public onClick(line: number, pixel: number) {
    this.pic[line][pixel] = !this.pic[line][pixel];
    console.table(this.pic);
  }

  public onOver(line: number, pixel: number) {
    if (this.longPress)
      this.pic[line][pixel] = this.changeTo;
  }
}
