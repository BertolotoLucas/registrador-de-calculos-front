import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss']
})
export class InputNameComponent implements OnInit {
  public name: string | undefined;
  
  constructor(private router:Router) {}
  ngOnInit(): void {}  

  registerName($page:string=''): void {
    const routes: string[] = [];

    if (this.name) {
      console.log(this.name)
      routes.push($page);
      this.router.navigate(routes);
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

