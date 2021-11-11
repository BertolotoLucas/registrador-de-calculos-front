import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Calculo } from '../model/calculo';
import { CalculoService } from '../service/calculo.service';
import { OrganizerService } from '../utils/organizer.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  name = '';
  calculations: Calculo[] = [];
  private searchTerms = new Subject<string>();

  constructor(private util:OrganizerService, private calculoService:CalculoService, private router:Router) {}

  ngOnInit():void {
    this.name = history.state.data;   
    //this.getCalculos();
  }

  ngAfterViewChecked(): void {
    this.util.organizeTheBlocks();
  }  	


  search(term: string): void {
    this.searchTerms.next(term);
  }

  getCalculos(){
    this.calculoService.getCalculos().toPromise().then(
      calculations => this.calculations = calculations
    );
  }

  returnToCalculator(){
    const routes: string[] = [];
    if (this.name) {
      routes.push("calculator");
      this.router.navigate(routes,{state:{data:this.name}});
    }
  }

}
