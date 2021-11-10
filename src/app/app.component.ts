import { Component } from '@angular/core';
import { OrganizerService } from './utils/organizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registrador-de-calculos-front';  
  constructor(private util:OrganizerService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.util.organizeTheBlocks(), 0.001);
  }

  
}
