import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unknown'
})
export class UnknownPipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase() === 'unknown' ? '-' : value;
  }

}
