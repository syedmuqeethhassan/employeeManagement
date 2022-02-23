import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value, 'args;;;');
    if (!args) {
      return value;
    }
    // return value.filter((val) => {
    //   let rVal =
    //     val.name.toLocaleLowerCase().includes(searchText) ||
    //     val.username.toLocaleLowerCase().includes(args);
    //   return rVal;
    // });
  }

}
