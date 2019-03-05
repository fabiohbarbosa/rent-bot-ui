import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Property from '../../models/property.model';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-houses-table',
  templateUrl: './houses-table.component.html',
  styleUrls: ['./houses-table.component.scss']
})
export class HousesTableComponent implements OnInit {

  @Input()
  dataset: Property[] = [];

  @Output()
  sortDataEvent: EventEmitter<Sort> = new EventEmitter();

  displayedColumns: string[];

  constructor() {}

  ngOnInit() {
    this.displayedColumns = [
      'title', 'provider', 'topology', 'ngr',
      'price', 'createAt', 'status', 'link', 'mail'
    ];
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  sortData(sort: Sort) {
    this.sortDataEvent.emit(sort);
  }
}
