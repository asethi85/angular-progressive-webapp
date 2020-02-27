import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPet } from '../interfaces/pet.interface';
import { DexieService } from './dexie.service';
import { tap, map } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class DataFacadeService {
  isOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isCachingEnabled = false;

  constructor(private httpClient: HttpClient, private dexie: DexieService) {
    window.addEventListener('online', (event) => this.isOnline.next(event.type === 'online'));
    window.addEventListener('offline', (event) => this.isOnline.next(event.type === 'online'));
  }

  getAllPetDrafts(): Observable<IPet[]> {
    return from(this.dexie.pets.toArray());
  }

  getPetList(queryParam: string): Observable<IPet[]> {
    const url = 'https://petstore.swagger.io/v2/pet/findByStatus?' + queryParam;
    return this.httpClient.get<IPet[]>(url);
  }

  getPetCategoryList(): Observable<any> {
    const url = './assets/categories.json';
    if (!this.isCachingEnabled || this.isOnline.value) {
      return this.httpClient.get(url).pipe(tap((data: any) => {
        this.dexie.categories.clear().then(() => {
          this.dexie.categories.bulkAdd(data.categories).catch((e) => console.log(e));
        });
      }));
    } else {
      return from(this.dexie.categories.toArray()).pipe(map((data: any[]) => {
        return { categories: data };
      }));
    }
  }

  getPetStatusList(): Observable<any> {
    const url = './assets/statuses.json';
    if (!this.isCachingEnabled || this.isOnline.value) {
      return this.httpClient.get(url).pipe(tap((data: any) => {
        this.dexie.statuses.clear().then(() => {
          this.dexie.statuses.bulkAdd(data.statuses).catch((e) => console.log(e));
        });
      }));
    } else {
      return from(this.dexie.statuses.toArray()).pipe(map((data: any[]) => {
        return { statuses: data };
      }));
    }
  }

  createPet(pet: IPet) {
    if (!this.isCachingEnabled || this.isOnline.value) {
      if (pet.id) {
        this.dexie.pets.delete(pet.id);
        delete pet.id;
      }
      const url = 'https://petstore.swagger.io/v2/pet/';
      return this.httpClient.post<any>(url, pet).pipe(map(() => 'Pet Created Succesfully'));
    } else {
      return from(this.dexie.pets.add(pet)).pipe(map(() => 'Network is not available, Pet Added to drafts'));
    }
  }
}
