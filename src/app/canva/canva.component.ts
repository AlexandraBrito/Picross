import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ThrowStmt } from '@angular/compiler';

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
  verticalNumbers = new Array();
  horizontalNumbers = new Array();
  public pic = this.makeArray(this.height, this.width, false);

  ngOnInit(): void {
  }

  public makeArray(w: number, h: number, val: any) {
    var arr = [];
    for (let i = 0; i < h; i++) {
      arr[i] = [];
      for (let j = 0; j < w; j++) {
        arr[i][j] = val;
      }
    }
    return arr;
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

  public calculateAll() {
    this.horizontalNumbers = new Array();
    this.verticalNumbers = new Array();

    this.calcHorizontal();
    this.calcVertical();

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
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
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
}


