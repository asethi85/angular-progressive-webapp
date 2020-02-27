import Dexie from 'dexie';
import { IPet } from '../interfaces/pet.interface';

export class DexieService extends Dexie {
  categories: Dexie.Table<IPet, number>;
  statuses: Dexie.Table<IPet, number>;
  pets: Dexie.Table<IPet, number>;

  constructor() {
    super('AngularPWA');
    this.version(1).stores({
      pet: '++id',
      category: 'id',
      status: 'id'
    });

    this.categories = this.table('category');
    this.statuses = this.table('status');
    this.pets = this.table('pet');
  }
}
