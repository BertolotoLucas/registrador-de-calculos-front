import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  constructor() { }

  public organizeTheBlocks() {
    var heightMain = 0;
    let main = document.querySelector("main");
    main!.style.paddingTop = ("0px");
    main!.style.paddingBottom = ("0px");
    heightMain = main!.clientHeight;

    console.log("Altura do main: " + heightMain);
    if(heightMain)
    if(heightMain>=0){ 
      let navbar = document.querySelector("nav");
      var heightNavbar = navbar?.clientHeight;
    
      
      let footer = document.querySelector("footer");
      var heightFooter = footer?.clientHeight;
      var totalHeight = Number(heightMain) + Number(heightNavbar) + Number(heightFooter);

      console.log("Altura do navbar: " + heightNavbar);
      console.log("Altura do footer: " + heightFooter);
      console.log("Altura total: " + totalHeight);
      console.log("Altura do vh: " + this.vh);

      if (totalHeight < this.vh) {
        var i = this.vh - totalHeight;
        var i2 = i / 2;
        main!.style.paddingTop = (i2.toString() + "px");
        main!.style.paddingBottom = (i2.toString() + "px");

      } else {
        main!.style.paddingTop = ("0px");
        main!.style.paddingBottom = ("0px");
      }

      /* if (totalHeight<this.vh) {
        var margin = this.vh - totalHeight;
        console.log("Margem para o footer: "+margin);
        footer!.style.marginTop = margin.toString()+"px";
        console.log()
      } else {
          footer!.style.marginTop = "0px";
      } */
    }
    
  }
}
