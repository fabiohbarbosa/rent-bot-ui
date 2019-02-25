import { Component, OnInit, Input } from '@angular/core';
import Property from '../../models/property.model';

@Component({
  selector: 'app-houses-table',
  templateUrl: './houses-table.component.html',
  styleUrls: ['./houses-table.component.scss']
})
export class HousesTableComponent implements OnInit {

  @Input()
  dataset: Property[] = [];

  displayedColumns: string[];

  constructor() { }

  ngOnInit() {
    this.displayedColumns = [
      'title', 'topology', 'ngr',
      'price', 'createAt', 'status', 'link'
    ];
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

}
