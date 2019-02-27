import { Component, OnInit } from '@angular/core';
import Property, {
  Topology, Status, Ngr,
  getTopologyByValue, getStatusByValue, getNgrByValue
} from '../models/property.model';
import { PropertyService } from '../services/property.service';
import { FilterValue } from './houses-filter/houses-filter.component';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss']
})
export class HousesListComponent implements OnInit {
  immutableProperties: Property[];
  dataset: Property[] = [];

  topologies: Topology[];
  status: Status[];
  ngrs: Ngr[];

  topologiesDefault: Topology[];
  statusDefault: Status[];
  ngrsDefault: Ngr[];

  topologyFilters: Topology[] = [];
  statusFilters: Status[] = [];
  ngrFilters: Ngr[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.topologies = Object.values(Topology);
    this.topologiesDefault = this.topologies;
    // this.topologies.unshift('Select all');

    this.status = Object.values(Status);
    this.statusDefault = [Status.MATCHED, Status.PENDING];
    // this.status.unshift('Select all');

    this.ngrs = Object.values(Ngr);
    this.ngrsDefault = [Ngr.A_PLUS, Ngr.A, Ngr.B_PLUS, Ngr.B, Ngr.UNKNOWN];
    // this.status.unshift('Select all');

    this.propertyService
      .findAll()
      .subscribe(properties => {
        this.immutableProperties = properties;
        this.dataset = properties;
      });
  }

  topologySelected(filterValues: FilterValue[]): void {
    this.topologyFilters = filterValues
      .filter(f => f.selected)
      .map(f => getTopologyByValue(f.value));

    this.applyFilter();
  }

  statusSelected(filterValues: FilterValue[]): void {
    this.statusFilters = filterValues
      .filter(f => f.selected)
      .map(f => getStatusByValue(f.value));

    this.applyFilter();
  }

  ngrSelected(filterValues: FilterValue[]): void {
    this.ngrFilters = filterValues
      .filter(f => f.selected)
      .map(f => getNgrByValue(f.value));

    this.applyFilter();
  }

  applyFilter(): void {
    const topologyLength = this.topologyFilters.length;
    const statusLength = this.statusFilters.length;
    const ngrLength = this.ngrFilters.length;

    if (topologyLength === 0 && statusLength === 0 && ngrLength === 0) {
      this.dataset = this.immutableProperties;
      return;
    }

    this.dataset = this.immutableProperties
      .filter(p => {
        if (topologyLength > 0) return this.topologyFilters.indexOf(p.topology) > -1;
        return p;
      })
      .filter(p => {
        if (statusLength > 0) return this.statusFilters.indexOf(p.status) > -1;
        return p;
      })
      .filter(p => {
        if (ngrLength > 0) return this.ngrFilters.indexOf(p.ngr) > -1;
        return p;
      });

  }
}
