import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface FilterValue {
  index: number;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-houses-filter',
  templateUrl: './houses-filter.component.html',
  styleUrls: ['./houses-filter.component.scss']
})
export class HousesFilterComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  data: FilterValue[];

  @Output()
  valueSelected: EventEmitter<FilterValue[]> = new EventEmitter();

  @Input()
  expanded = true;

  filters: FilterValue[];

  ngOnInit() {
    // create filters object with select all option
    const isSelectAll = this.data.filter(d => d.selected).length === this.data.length;
    this.filters = this._unshiftSelectAllOption(this.data, isSelectAll);
  }

  selectValue(index: number): void {
    let selected: boolean;
    let newData: FilterValue[];

    if (index === 0) {
      // toggle value from first checkbox
      selected = !this.filters[0].selected;

      // set from data select or unselect on all data
      newData =  this.data.map(d => ({...d, selected}));
      this.filters = this._unshiftSelectAllOption(newData, selected);

      // emit event sending data without 'select all' entry
      this.valueSelected.emit(newData);
      return;
    }

    selected = !this.filters[index].selected;
    this.filters.shift();

    newData = this.filters.map(d => {
      if (d.index !== index - 1) { return d; }
      return { ...d, selected };
    });

    const selectAll = newData.filter(d => d.selected).length === newData.length;
    this.filters = this._unshiftSelectAllOption(newData, selectAll);

    this.valueSelected.emit(newData);
  }

  _unshiftSelectAllOption(object: FilterValue[], selected: boolean): FilterValue[] {
    const filters = Object.assign([], object);

    filters.unshift({
      index: -1,
      value: 'Select all',
      selected
    });

    return filters;
  }

}

export { FilterValue };
