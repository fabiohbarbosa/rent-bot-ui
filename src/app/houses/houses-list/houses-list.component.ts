import { Component, OnInit } from '@angular/core';
import Property, {
  Topology, Status, Ngr,
  getTopologyByValue, getStatusByValue, getNgrByValue, ngrComparableAsc, ngrComparableDesc
} from '../models/property.model';
import { PropertyService } from '../services/property.service';
import { FilterValue } from './houses-filter/houses-filter.component';
import { Sort } from '@angular/material';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss']
})
export class HousesListComponent implements OnInit {
  initialDatasetState: Property[];
  dataset: Property[] = [];

  // values to configure filters
  topologyFilters: FilterValue[] = [];
  statusFilters: FilterValue[] = [];
  ngrFilters: FilterValue[] = [];

  // values selected on filters
  topologySelected: Topology[] = [];
  statusSelected: Status[] = [];
  ngrSelected: Ngr[] = [];

  defaultSort: Sort = { active: 'createAt', direction: 'asc' };

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.topologyFilters = this._buildFilter(Object.values(Topology));
    this.statusFilters = this._buildFilter(Object.values(Status));
    this.ngrFilters = this._buildFilter(Object.values(Ngr));

    this.propertyService
      .findAll()
      .subscribe(properties => {
        this.initialDatasetState = this._clone(properties);
        this.dataset = this._applyFilter();
      });
  }

  _buildFilter(enumValues: string[]): FilterValue[] {
    const filters: FilterValue[] = [];

    enumValues.forEach((value, index) => {
      filters.push({
        index,
        value,
        selected: false
      })
    })

    return filters;
  }

  selectTopology(filterValues: FilterValue[]): void {
    this.topologySelected = filterValues
                              .filter(f => f.selected)
                              .map(t => getTopologyByValue(t.value));
    this.dataset = this._applyFilter();
  }

  selectStatus(filterValues: FilterValue[]): void {
    this.statusSelected = filterValues
                            .filter(f => f.selected)
                            .map(t => getStatusByValue(t.value));
    this.dataset = this._applyFilter();
  }

  selectNgr(filterValues: FilterValue[]): void {
    this.ngrSelected = filterValues
                          .filter(f => f.selected)
                          .map(t => getNgrByValue(t.value));
    this.dataset = this._applyFilter();
  }

  _applyFilter(): Property[] {
     // it waits for observable event message
     if (!this.initialDatasetState) return [];

    const topologyLength = this.topologySelected.length;
    const statusLength = this.statusSelected.length;
    const ngrLength = this.ngrSelected.length;

    if (topologyLength === 0 && statusLength === 0 && ngrLength === 0) {
      return this._initialState();
    }

    return this.initialDatasetState
      .filter(p => {
        if (topologyLength === 0) return p;
        return this.topologySelected .indexOf(p.topology) > -1;
      })
      .filter(p => {
        if (statusLength === 0) return p;
        return this.statusSelected .indexOf(p.status) > -1;
      })
      .filter(p => {
        if (ngrLength === 0) return p;
        return this.ngrSelected.indexOf(p.ngr) > -1;
      });
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.dataset = this._initialState();
      return;
    }

    if (sort.active === 'ngr') {
      // clone object
      const newDataset = this._initialState();
      const ngrComparable = sort.direction === 'asc' ? ngrComparableAsc : ngrComparableDesc;

      newDataset.sort(ngrComparable);
      this.dataset = newDataset;
      return;
    }
    this.dataset = orderBy(this.initialDatasetState, [sort.active], [sort.direction]);
  }

  _initialState(): Property[] {
    return this._clone(this.initialDatasetState);
  }

  _clone(properties: Property[]): Property[] {
    return Object.assign([], properties);
  }

}
