import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Property from '../../models/property.model';
import { Sort } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    const smallColumns = [
      'title', 'ngr'
    ];

    const largeColumns = [
      'title', 'provider', 'topology', 'ngr',
      'price', 'createAt', 'status', 'link'
    ];
    this._layoutChangesBind(smallColumns, largeColumns);
  }

  openLinkSmallDevices(property: Property): void {
    const isSmallScreen = this.breakpointObserver.isMatched([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]);
    if (!isSmallScreen) { return; }
    this.openLink(property.url);
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  sortData(sort: Sort) {
    this.sortDataEvent.emit(sort);
  }

  _layoutChangesBind(smallColumns: string[], largeColumns: string[]): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(result => {
      if (!result.matches) { return; }
      this.displayedColumns = smallColumns;
      console.log('Small device changed');
    });

    this.breakpointObserver.observe([
      Breakpoints.Web
    ]).subscribe(result => {
      if (!result.matches) { return; }
      this.displayedColumns = largeColumns;
      console.log('Big device changed');
    });

  }
}
