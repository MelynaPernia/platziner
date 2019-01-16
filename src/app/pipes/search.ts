import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, args: string) {
    if(!value) {
      return;
    }
    if(!args) {
      return value;
    }
    //compararlos con el objeto del arreglo
    args = args.toLocaleLowerCase();
    return value.filter(item =>{
      return JSON.stringify(item).toLocaleLowerCase().includes(args);
    })
  }
}
