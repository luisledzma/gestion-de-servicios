import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horas'
})
export class HorasPipe implements PipeTransform {

  transform(value: any): any {
    let newStr = "";
    let splitted = [];

    
    if(value){
      splitted = value.split(".");
      newStr += splitted[0];
    }else{
      newStr = "N/A"
    }
    

    return newStr;
  }

}
