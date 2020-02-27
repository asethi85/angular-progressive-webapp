import { Component } from '@angular/core';
import { DataFacadeService } from './services/data-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular PWA';
  isOnline: boolean;
  constructor(private dataFacadeService: DataFacadeService) {
    this.dataFacadeService.isOnline.subscribe((state: boolean) => this.isOnline = state);
  }
}
