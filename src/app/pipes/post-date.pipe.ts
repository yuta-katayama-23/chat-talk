import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postDate'
})
export class PostDatePipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    const format = args[0] || 'yyyy年MM月dd日 HH:mm';
    return formatDate(value, format, 'en-US');
  }

}
