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
  width: number = 10;
  height: number = 12;
  pixels: Array<{ id: number, value: boolean }> = [];
  pic;

  ngOnInit(): void {
    // for (var i = 0; i < this.width * this.height; i++) {
    //   this.pixels.push({ id: i, value: false });
    // }
    this.pic = this.makeArray(this.width, this.height, false);

    console.table(this.pic);

  }

  public makeArray(w, h, val) {
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
}


