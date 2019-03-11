import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountConverter'
})
export class AmountConverterPipe implements PipeTransform {
  /**
   * Преобразовать число в строку определенного формата
   * @param value - число, которое необходимо конвертировать
   * @param digits - к-во знаков после запятой
   */
  transform(value: number, digits: number = 0): string {
    const suffixes = ['K', 'M', 'B'];

    if (value < 1000) {
      return value.toLocaleString();
    }

    const exp = Math.floor(Math.log(value) / Math.log(1000));

    return (value / Math.pow(1000, exp)).toLocaleString('en-EN', {maximumFractionDigits: digits}) + suffixes[exp - 1];
  }
}
