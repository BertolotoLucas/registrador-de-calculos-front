import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calculo } from '../model/calculo';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss']
})
export class InputNameComponent implements OnInit {
  public name: string | undefined;
  public page = "calculator";
  
  constructor(private router:Router) {}
  ngOnInit(): void {
    calculo: Calculo;
    
    
  }  

  registerName(name:string|undefined): void {
    const routes: string[] = [];
    this.name = name;
    if (this.name) {
      routes.push(this.page);
      this.router.navigate(routes,{state:{data:this.name}});

      //this.reloadComponent();
    }
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }
}

