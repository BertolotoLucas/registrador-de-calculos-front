import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CalculoService } from '../service/calculo.service';

import { OrganizerService } from '../utils/organizer.service';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss']
})
export class InputNameComponent implements OnInit {
  public name: string | undefined;
  public page = "calculator";
  public faArrowRight = faArrowRight;
  
  constructor(private router:Router,private util:OrganizerService, private CalculoService:CalculoService) {}
  ngOnInit(): void {
    this.CalculoService.getCalculos().toPromise().then();  //just to wakeup the server
    if (history.state.data)
      this.name = history.state.data;
    this.util.organizeTheBlocks();
    setTimeout(() => this.util.organizeTheBlocks(), 2); //just to ensure 
  }  

  ngAfterViewInit(): void {
    setTimeout(() => this.util.organizeTheBlocks(), 0.001);
  }

  registerName(name:string|undefined): void {
    const routes: string[] = [];
    this.name = name;
    if (this.name) {
      routes.push(this.page);
      this.router.navigate(routes,{state:{data:this.name}});
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }
}

