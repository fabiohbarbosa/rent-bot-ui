import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatTableModule,
  MatSortModule, MatIconModule, MatCardModule, MatExpansionModule,
  MatMenuModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';

const modules = [
  CommonModule,
  MatSnackBarModule,
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
