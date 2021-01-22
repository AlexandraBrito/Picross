import { Component, Input, OnInit } from '@angular/core';

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
    this.changeTo = this.pic[line][pixel];
  }

  public onMouseUp() {
    this.longPress = false;
  }

  public onClick(line: number, pixel: number) {
    this.pic[line][pixel] = !this.pic[line][pixel];
  }

  public onOver(line: number, pixel: number) {
    if (this.longPress)
      this.pic[line][pixel] = this.changeTo;
  }

  public changeColor(n: { id: number, value: boolean }) {

    this.calculate(n.id);
  }

  private calculate(index: number) {
    this

  }

  // public calculateAll() {
  //   var counter = 0;
  //   this.verticalNumbers = new Array();
  //   this.horizontalNumbers = new Array();
  //   var numberLine = new Array()

  //   for (var w = 0; w < this.width; w++) {
  //     for (var h = 0; h < this.height; h++) {
  //       var i = w + h * this.width;
  //       if (this.pixels[i].value)
  //         counter++;
  //       else if (counter != 0) {
  //         numberLine.push(counter);
  //         counter = 0;
  //       }
  //     }
  //     if (counter != 0) {
  //       numberLine.push(counter);
  //       counter = 0;
  //     }
  //     if (numberLine.some(x => x != 0)) {
  //       this.horizontalNumbers.push(numberLine);
  //       numberLine = new Array();
  //     }
  //   }

  //   this.pixels.forEach(i => {
  //     if (i.id % this.width == 0) {
  //       if (counter != 0)
  //         numberLine.push(counter);
  //       if (numberLine.some(x => x != 0))
  //         this.verticalNumbers.push(numberLine);
  //       counter = 0
  //       numberLine = new Array();
  //     }

  //     if (i.value)
  //       counter++;
  //     else if (counter != 0) {
  //       numberLine.push(counter);
  //       counter = 0;
  //     }
  //   });

  //   if (counter != 0)
  //     numberLine.push(counter);
  //   if (numberLine.some(x => x != 0))
  //     this.verticalNumbers.push(numberLine);
  //   counter = 0
  //   numberLine = new Array();
  //   console.log("->   ", this.horizontalNumbers);
  //   console.log("|   ", this.verticalNumbers);
  // }

}
