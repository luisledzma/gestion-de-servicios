import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horas'
})
export class HorasPipe implements PipeTransform {

  transform(value: any): any {
    let newStr = "";
    
    if(value){
      newStr += `${value}:00:00`;
    }else{
      newStr = "00:00:00"
    }
    

    return newStr;
  }

}
