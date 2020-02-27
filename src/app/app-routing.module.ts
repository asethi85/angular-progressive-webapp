import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { PetDraftComponent } from './pet-draft/pet-draft.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pet/list',
    pathMatch: 'full',
  },
  {
    path: 'pet/list',
    component: PetListComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'pet/create',
    component: CreatePetComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'pet/draft',
    component: PetDraftComponent,
    canActivate: [RouteGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
