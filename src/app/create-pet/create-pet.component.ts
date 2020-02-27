import { Component, OnInit } from '@angular/core';
import { DataFacadeService } from '../services/data-facade.service';
import { IPet } from '../interfaces/pet.interface';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.scss']
})
export class CreatePetComponent implements OnInit {

  petName: string;
  petCategory: string;
  petStatus: string;
  categories: any[] = [];
  statuses: any[] = [];

  constructor(private dataService: DataFacadeService) { }

  ngOnInit() {
    this.dataService.getPetCategoryList().subscribe((data: any) => {
      this.categories = data.categories;
    });
    this.dataService.getPetStatusList().subscribe((data: any) => {
      this.statuses = data.statuses;
    });
  }

  onSubmit(): void {
    const pet: IPet = {
      category: {
        id: parseInt(this.petCategory, 10),
        name: this.categories.find((item: any) => item.id === parseInt(this.petCategory, 10)).name
      },
      name: this.petName,
      status: this.statuses.find((item: any) => item.id === parseInt(this.petStatus, 10)).status
    };
    this.dataService.createPet(pet).subscribe((message: string) => {
      alert(message);
    });
  }
}
