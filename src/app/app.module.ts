import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatTableModule,
  MatSelectModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { DataFacadeService } from './services/data-facade.service';
import { RouteGuardService } from './services/route-guard.service';
import { DexieService } from './services/dexie.service';
import { PetDraftComponent } from './pet-draft/pet-draft.component';

@NgModule({
  declarations: [
    AppComponent,
    PetListComponent,
    CreatePetComponent,
    PetDraftComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ServiceWorkerModule.register('assets/service-worker.js', { enabled: false })
  ],
  providers: [RouteGuardService, DataFacadeService, DexieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
