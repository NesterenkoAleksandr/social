import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountConverterPipe } from './pipes/amount-converter.pipe';
import { CountdownDirective } from './directives/countdown.directive';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [
    AmountConverterPipe,
    CountdownDirective,
    DateAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AmountConverterPipe,
    DateAgoPipe,
    CountdownDirective
  ]
})
export class SharedModule { }
