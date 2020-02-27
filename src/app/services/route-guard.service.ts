import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { forkJoin, from } from 'rxjs';
import { DataFacadeService } from './data-facade.service';
import { DexieService } from './dexie.service';

@Injectable()
export class RouteGuardService implements CanActivate {
  constructor(private router: Router, private dataFacadeService: DataFacadeService, private dexieService: DexieService) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      forkJoin(from(this.dexieService.statuses.count()), from(this.dexieService.categories.count())).subscribe((data: number[]) => {
        if (data[0] === 0 || data[1] === 0) {
          this.handleCanActivate(route).then((state: boolean) => {
            return resolve(state);
          });
        } else {
          resolve(true);
        }
      }, (e) => reject(e));
    });
  }

  private handleCanActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return forkJoin(this.dataFacadeService.getPetCategoryList(), this.dataFacadeService.getPetStatusList())
      .toPromise().then((data: any[]) => {
        return true;
      }, () => false);
  }
}
