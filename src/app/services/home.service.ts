import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { randInt } from 'three/src/math/MathUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService{

  // "https://swapi.dev/api";

  data:any={
    starships : [],
    people : [],
    films : [],
    planets : [],
    species : [],
    vehicles : []
  }

  starshipsExistingObjectNamesTable : string[] = [
    "CR90 corvette",
    "Death Star",
    "Executor",
    "Millennium Falcon",
    "Rebel transport",
    "Sentinel-class landing craft",
    "Star Destroyer",
    "TIE Advanced x1",
    "X-wing",
    "Y-wing"
  ];
  dataSub:BehaviorSubject<{
    starships:boolean,
    people:boolean,
    films:boolean,
    planets:boolean,
    species:boolean,
    vehicles:boolean
  }>;


  constructor(
    private http: HttpClient,
  ) {
    this.dataSub = new BehaviorSubject<{
      starships:boolean,
      people:boolean,
      films:boolean,
      planets:boolean,
      species:boolean,
      vehicles:boolean
    }>({
      starships:false,
      people:false,
      films:false,
      planets:false,
      species:false,
      vehicles:false
    });

  }


  loadData(){
    this.getList("starships");
    this.getList("planets");
    this.getList("films");
    this.getList("people");
    this.getList("vehicles");
    this.getList("species");
  }



  getList(type:string){
    this.http.get(environment.api+type).subscribe((res:any)=>{
      this.data[type]=res;

      let modifiedSub:any = this.dataSub.value;
      modifiedSub[type] = true;
      this.dataSub.next(modifiedSub);

    });
  }


}
