import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HousesListComponent } from './houses/houses-list/houses-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/houses', pathMatch: 'full' },
  { path: 'houses', component: HousesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
