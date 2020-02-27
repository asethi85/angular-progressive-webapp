import { Component, OnInit } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DataFacadeService } from '../services/data-facade.service';
import { IPet } from '../interfaces/pet.interface';

@Component({
  selector: 'app-pet-draft',
  templateUrl: './pet-draft.component.html',
  styleUrls: ['./pet-draft.component.scss']
})
export class PetDraftComponent implements OnInit {
  dataSource: Subject<any> = new Subject();
  displayedColumns: string[] = ['name', 'category', 'status', 'submit'];
  isOnline: boolean;

  constructor(private dataService: DataFacadeService) {
    this.dataService.isOnline.subscribe((state: boolean) => {
      this.isOnline = state;
    });
  }

  ngOnInit() {
    this.dataService.getAllPetDrafts().subscribe((pets: IPet[]) => {
      this.dataSource.next(pets);
    });
  }

  onSubmit(pet: IPet) {
    this.dataService.createPet(pet).subscribe((message: string) => {
      alert(message);
    });
  }
}
