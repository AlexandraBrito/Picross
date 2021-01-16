import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css']
})
export class CanvaComponent implements OnInit {

  constructor() {
  }
  width: number = 50;
  height: number = 30;
  pixels: Array<{ id: number, value: boolean }> = [];
  changeTo: boolean = true;
  longPress = false;

  verticalNumbers = new Array();
  horizontalNumbers = new Array();


  ngOnInit(): void {
    for (var i = 0; i < this.width * this.height; i++) {
      this.pixels.push({ id: i, value: false });
    }
  }

  public onMouseDown(n: { id: number, value: boolean }) {
    this.longPress = true;
    this.changeTo = !n.value;
  }

  public onMouseUp() {
    this.longPress = false;
    // this.calculateAll();
  }

  public onClick(n: { id: number, value: boolean }) {
    var i = !this.pixels[n.id].value
    this.pixels[n.id].value = i;
  }

  public onOver(n: { id: number, value: boolean }) {
    if (this.longPress)
      n.value = this.changeTo;
  }

  public changeColor(n: { id: number, value: boolean }) {

    this.calculate(n.id);
  }

  private calculate(index: number) {
    this

  }

  public calculateAll() {
    var counter = 0;
    this.verticalNumbers = new Array();
    this.horizontalNumbers = new Array();
    var numberLine = new Array()

    for (var w = 0; w < this.width; w++) {
      for (var h = 0; h < this.height; h++) {
        var i = w + h * this.width;
        if (this.pixels[i].value)
          counter++;
        else if (counter != 0) {
          numberLine.push(counter);
          counter = 0;
        }
      }
      if (counter != 0) {
        numberLine.push(counter);
        counter = 0;
      }
      if (numberLine.some(x => x != 0)) {
        this.horizontalNumbers.push(numberLine);
        numberLine = new Array();
      }
    }

    this.pixels.forEach(i => {
      if (i.id % this.width == 0) {
        if (counter != 0)
          numberLine.push(counter);
        if (numberLine.some(x => x != 0))
          this.verticalNumbers.push(numberLine);
        counter = 0
        numberLine = new Array();
      }

      if (i.value)
        counter++;
      else if (counter != 0) {
        numberLine.push(counter);
        counter = 0;
      }
    });

    if (counter != 0)
      numberLine.push(counter);
    if (numberLine.some(x => x != 0))
      this.verticalNumbers.push(numberLine);
    counter = 0
    numberLine = new Array();
    console.log("->   ", this.horizontalNumbers);
    console.log("|   ", this.verticalNumbers);
  }



  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    if (data)
      html2canvas(data).then(canvas => {
        // Few necessary setting options  
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf.jsPDF(); // A4 size page of PDF  
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('MYPdf.pdf'); // Generated PDF   
      });
  }
}


