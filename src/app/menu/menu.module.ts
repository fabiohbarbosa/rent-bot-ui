import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './navigation/navigation.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [HeaderComponent]
})
export class MenuModule { }
