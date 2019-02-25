import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatTableModule,
  MatSortModule, MatIconModule, MatCardModule, MatExpansionModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { CommonModule } from '@angular/common';

const modules = [
  CommonModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatCardModule,
  MatExpansionModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
