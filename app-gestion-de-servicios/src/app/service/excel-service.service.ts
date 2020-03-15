import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import * as jspdf_autotable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }

  exportPdf(bod: any[], head: any[], name: string) {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          const doc = new jsPDF.default(0,0);
          doc.autoTable({
            body: bod,
            columns: head,
          });
          doc.save(`${name}.pdf`);
      })
  })
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
}
