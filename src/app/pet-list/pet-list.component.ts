import { Component, OnInit } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DataFacadeService } from '../services/data-facade.service';
import { IPet } from '../interfaces/pet.interface';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  dataSource: Subject<any> = new Subject();
  displayedColumns: string[] = ['name', 'category', 'status'];

  includeAvailable: boolean;
  includePending: boolean;
  includeSold: boolean;

  constructor(private dataService: DataFacadeService) {
  }

  ngOnInit() {
    this.getPetList();
  }

  getPetList() {
    let url = '';
    if (this.includeAvailable) {
      url = url + 'status=available';
    }
    if (this.includePending) {
      url = url + 'status=pending';
    }
    if (this.includeSold) {
      url = url + 'status=sold';
    }

    // Fix this
    this.dataService.getPetList(url).subscribe((data: any) => {
      this.dataService.getPetCategoryList().subscribe((categoryData: any) => {
        this.dataSource.next(data.filter((item: IPet) => {
          return categoryData.categories.find((category) => {
            return item.category && category.id === item.category.id;
          }) !== undefined;
        }));
      });
    });
  }
}
