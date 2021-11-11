import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NameCheckerService {
  check(name: string, router: Router) {
    if (!name){
      router.navigate(['']);
      alert("Você foi redirecionado, pois precisa inserir o seu nome!");
    };
  }

  constructor() { }
}
