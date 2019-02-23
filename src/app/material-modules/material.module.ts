import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatTableModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModuleModule { }
