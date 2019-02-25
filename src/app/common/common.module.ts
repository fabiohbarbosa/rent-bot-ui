import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { PricePipe } from './pipes/price.pipe';

const pipes = [
  PricePipe
];

@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [
    AngularCommonModule
  ],
  exports: [
    ...pipes
  ]
})
export class CommonModule { }
