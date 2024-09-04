import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/data.service';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CombinedData } from '../../models/combined-data.interface';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  data$!: Observable<CombinedData>;
  searchForm: FormGroup;
  constructor(private service: Service, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }
  ngOnInit(): void {
    this.data$ = this.service.getCombinedData();

    this.searchForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((saerchTerm) => {
        this.data$ = this.service.getCombinedFilteredData(saerchTerm.search);
      });
  }
}
