import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { CommonModule } from '../common/common.module';

import { HousesListComponent } from './houses-list/houses-list.component';
import { HousesFilterComponent } from './houses-list/houses-filter/houses-filter.component';
import { HousesTableComponent } from './houses-list/houses-table/houses-table.component';
import { UnknownPipe } from './pipes/unknown.pipe';

@NgModule({
  declarations: [HousesListComponent, HousesFilterComponent, HousesTableComponent, UnknownPipe],
  imports: [
    AngularCommonModule,
    FlexLayoutModule,
    CommonModule,
    MaterialModule,
  ],
  exports: [HousesListComponent]
})
export class HousesModule { }
