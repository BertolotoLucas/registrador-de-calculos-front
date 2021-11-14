import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  constructor() { }

  public organizeTheBlocks() {
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var heightMain = 0;
    let main = document.querySelector("main");
    main!.style.paddingTop = ("0px");
    main!.style.paddingBottom = ("0px");
    heightMain = main!.clientHeight;

    if(heightMain)
    if(heightMain>=0){ 
      let header = document.querySelector("header");
      var heightNavbar = header?.clientHeight;
    
      
      let footer = document.querySelector("footer");
      var heightFooter = footer?.clientHeight;
      var totalHeight = Number(heightMain) + Number(heightNavbar) + Number(heightFooter);


      if (totalHeight < vh) {
        var i = vh - totalHeight;
        var i2 = i / 2;
        main!.style.paddingTop = (i2.toString() + "px");
        main!.style.paddingBottom = (i2.toString() + "px");

      } else {
        main!.style.paddingTop = ("0px");
        main!.style.paddingBottom = ("0px");
      }
    }
    
  }

  public organizePagination(){
    console.log("Peguei a altura da tabela sendo: " + document.querySelector(".table-responsive")?.clientHeight);
    var tableHeight = document.querySelector(".table-responsive")?.clientHeight;
    var paddingTop = 489 - Number(tableHeight) ;
    document.getElementById("nav-pag")!.style.paddingTop = paddingTop+"px";
  }
}
