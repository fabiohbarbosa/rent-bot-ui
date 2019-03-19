import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import Property, {
  Topology, Status, Ngr, Provider,
  getTopologyByValue, getStatusByValue, getNgrByValue, getProviderByValue,
  ngrComparableAsc, ngrComparableDesc
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
  localStorage: Storage = window.localStorage;

  initialDatasetState: Property[];
  dataset: Property[] = [];

  // values to configure filters
  topologyFilters: FilterValue[] = [];
  statusFilters: FilterValue[] = [];
  ngrFilters: FilterValue[] = [];
  providerFilters: FilterValue[] = [];

  // values selected on filters
  topologySelected: Topology[];
  statusSelected: Status[];
  ngrSelected: Ngr[];
  providerSelected: Provider[];

  isTopologyExpanded = false;
  isStatusExpanded = false;
  isNgrExpanded = false;
  isProviderExpanded = false;

  defaultSort: Sort = { active: 'createAt', direction: 'asc' };

  constructor(private propertyService: PropertyService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.topologyFilters = this._buildFilter(Object.values(Topology));
    this.statusFilters = this._buildFilter(Object.values(Status));
    this.ngrFilters = this._buildFilter(Object.values(Ngr));
    this.providerFilters = this._buildFilter(Object.values(Provider));

    this.propertyService
      .findAll()
      .subscribe(properties => {
        this.initialDatasetState = properties;
        this.dataset = this._applyFilter();
      }
    );

    this._loadSelectedFiltersFromStorage();
  }

  selectTopology(filterValues: FilterValue[]): void {
    const topologySelected: Topology[] = filterValues
      .filter(f => f.selected)
      .map(t => getTopologyByValue(t.value));

    this.topologySelected = topologySelected;
    this._storageSelectedFilter<Topology>('topologySelected', topologySelected);
    this.dataset = this._applyFilter();
  }

  selectStatus(filterValues: FilterValue[]): void {
    const statusSelected = filterValues
      .filter(f => f.selected)
      .map(t => getStatusByValue(t.value));

    this.statusSelected = statusSelected;
    this._storageSelectedFilter<Status>('statusSelected', statusSelected);
    this.dataset = this._applyFilter();
  }

  selectNgr(filterValues: FilterValue[]): void {
    const ngrSelected = filterValues
      .filter(f => f.selected)
      .map(t => getNgrByValue(t.value));

    this.ngrSelected = ngrSelected;
    this._storageSelectedFilter<Ngr>('ngrSelected', ngrSelected);
    this.dataset = this._applyFilter();
  }

  selectProvider(filterValues: FilterValue[]): void {
    const providerSelected = filterValues
      .filter(f => f.selected)
      .map(t => getProviderByValue(t.value));

    this.providerSelected = providerSelected;
    this._storageSelectedFilter<Provider>('providerSelected', providerSelected);
    this.dataset = this._applyFilter();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.dataset = this._initialState();
      return;
    }

    if (sort.active === 'ngr') {
      // clone object
      const newDataset = this._initialState();
      const ngrComparable = sort.direction === 'asc' ? ngrComparableAsc : ngrComparableDesc;

      newDataset.sort(ngrComparable);
      this.dataset = newDataset;
      return;
    }
    this.dataset = orderBy(this.initialDatasetState, [sort.active], [sort.direction]);
  }

  reloadCache(): void {
    const snackBarRef = this.snackBar.open('Reloading properties...');

    this.propertyService
      .reloadCache()
      .subscribe(
        properties => {
          this.initialDatasetState = properties;
          this.dataset = this._applyFilter();
          snackBarRef.dismiss();
        },
        (err) => console.error(`Error to reload properties from cache: ${err}`)
      );
  }

  private _loadSelectedFiltersFromStorage(): void {
    this.topologySelected = this._getSelectedFilter('topologySelected') || [];
    this.statusSelected = this._getSelectedFilter('statusSelected') || [];
    this.ngrSelected = this._getSelectedFilter('ngrSelected') || [];
    this.providerSelected = this._getSelectedFilter('providerSelected') || [];

    this.topologyFilters.forEach(f => {
      if (this.topologySelected.indexOf(getTopologyByValue(f.value)) > -1) {
        f.selected =  true;
        this.isTopologyExpanded = true;
      }
    });

    this.statusFilters.forEach(f => {
      if (this.statusSelected.indexOf(getStatusByValue(f.value)) > -1) {
        f.selected =  true;
        this.isStatusExpanded = true;
      }
    });

    this.ngrFilters.forEach(f => {
      if (this.ngrSelected.indexOf(getNgrByValue(f.value)) > -1) {
        f.selected =  true;
        this.isNgrExpanded = true;
      }
    });

    this.providerFilters.forEach(f => {
      if (this.providerSelected.indexOf(getProviderByValue(f.value)) > -1) {
        f.selected =  true;
        this.isProviderExpanded = true;
      }
    });
  }

  private _applyFilter(): Property[] {
    // it waits for observable event message
    if (!this.initialDatasetState) { return []; }

    const topologyLength = this.topologySelected.length;
    const statusLength = this.statusSelected.length;
    const ngrLength = this.ngrSelected.length;
    const providerLength = this.providerSelected.length;

    if (topologyLength === 0 && statusLength === 0 && ngrLength === 0 && providerLength === 0) {
      return this._initialState();
    }

    let filteredProperties = [];

    if (topologyLength > 0) {
      filteredProperties = this.initialDatasetState.filter(p =>
        this.topologySelected.indexOf(p.topology) > -1
      );
    }

    if (statusLength > 0) {
      filteredProperties = this.initialDatasetState.filter(p =>
        this.statusSelected.indexOf(p.status) > -1
      );
    }

    if (ngrLength > 0) {
      filteredProperties = this.initialDatasetState.filter(p =>
        this.ngrSelected.indexOf(p.ngr) > -1
      );
    }

    if (providerLength > 0) {
      filteredProperties = this.initialDatasetState.filter(p =>
        this.providerSelected.indexOf(p.provider) > -1
      );
    }

    return filteredProperties;
  }

  private _buildFilter(enumValues: string[]): FilterValue[] {
    const filters: FilterValue[] = [];

    enumValues.forEach((value, index) => {
      filters.push({
        index,
        value,
        selected: false
      });
    });

    return filters;
  }

  private _initialState(): Property[] {
    return this._clone(this.initialDatasetState);
  }

  private _clone(properties: Property[]): Property[] {
    return Object.assign([], properties);
  }

  private _storageSelectedFilter<T>(key: string, value: T[]): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  private _getSelectedFilter<T>(key: string): T[] {
    return JSON.parse(this.localStorage.getItem(key));
  }

}
