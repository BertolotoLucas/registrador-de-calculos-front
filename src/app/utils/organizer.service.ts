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
    heightMain = Math.ceil(main!.getBoundingClientRect().height);
    if(heightMain)
    if(heightMain>=0){ 
      let header = document.querySelector("header");
      var heightHeader = Math.floor(header!.getBoundingClientRect().height);     
      let footer = document.querySelector("footer");
      var heightFooter = Math.floor(footer!.getBoundingClientRect().height);
      var totalHeight = heightMain + heightHeader + heightFooter;
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
    var tableHeight = document.querySelector(".table-responsive")?.clientHeight;
    //console.log("Altura da tabela: "+tableHeight);
    if(tableHeight)
    if (tableHeight<=537) {
      var paddingTop = 537 - Number(tableHeight) ;
      //console.log("Padding top que sera inserido: "+ paddingTop);
      let pagination = document.getElementById("nav-pag");
      if(pagination)
        pagination.style.paddingTop = paddingTop+"px";
    } else {
        let pagination = document.getElementById("nav-pag");
        if (pagination)
          pagination.style.paddingTop = "0px";
    }
  }
}
