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

  @Input()
  defaultData: string[];

  @Output()
  valueSelected: EventEmitter<FilterValue[]> = new EventEmitter();

  @Input()
  expanded = true;

  filters: FilterValue[];

  ngOnInit() {
    // create filters object with select all option
    this.filters = this._unshiftSelectAllOption(this.data, false);
  }

  selectValue(index: number): void {
    if (index === 0) {
      // toggle value from first checkbox
      const selected = !this.filters[0].selected;

      // set from data select or unselect on all data
      const newData =  this.data.map(d => ({...d, selected}));
      this.filters = this._unshiftSelectAllOption(newData, selected);

      // emit event sending data without 'select all' entry
      this.valueSelected.emit(newData);
      return;
    }

    const selected = !this.filters[index].selected;
    this.filters.shift();

    const newData = this.filters.map(d => {
      if (d.index !== index - 1) return d;
      return { ...d, selected };
    });


    const selectAll = newData.filter(d => d.selected).length == newData.length;
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
