import { Component } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Picross';


  width: number = 50;
  height: number = 30;
  verticalNumbers = new Array();
  horizontalNumbers = new Array();
  public canva: { isPainted: boolean, value: number }[][] = this.makeArray(this.height, this.width, false);


  public makeArray(w: number, h: number, val: any) {
    var arr = [];
    for (let i = 0; i < h; i++) {
      arr[i] = [];
      for (let j = 0; j < w; j++) {
        arr[i][j] = { isPainted: val };
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
