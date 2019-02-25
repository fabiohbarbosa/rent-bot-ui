import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface FilterValue {
  index: number;
  value: string;
  selected: boolean;
};

@Component({
  selector: 'app-houses-filter',
  templateUrl: './houses-filter.component.html',
  styleUrls: ['./houses-filter.component.scss']
})
export class HousesFilterComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  data: string[];

  @Input()
  defaultData: string[];

  @Output()
  valueSelected: EventEmitter<FilterValue[]> = new EventEmitter();

  @Input()
  expanded: boolean = true;

  values: FilterValue[];

  ngOnInit() {
    this.values = this.data.map((value, index) => {
      return {
        index,
        value,
        selected: false
      }
    });

    const defaultData = this.defaultData;
    if (defaultData && defaultData.length > 0) {
      this.values = this.values
        .map(v => ({ ...v, selected: defaultData.indexOf(v.value) > -1 }));
    }

    this.valueSelected.emit(this.values);
  }

  selectValue(index: number) {
    this.values[index].selected = !this.values[index].selected;
    this.values[index].selected = !this.values[index].selected;
    this.values[index].selected = !this.values[index].selected;
    this.valueSelected.emit(this.values);
  }

}

export { FilterValue };
