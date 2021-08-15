import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { randInt } from 'three/src/math/MathUtils';
import { HomeService } from '../services/home.service';
import { ShowSpaceshipDetailsComponent } from './show-spaceship-details/show-spaceship-details.component';

@Component({
	selector: 'home',
	templateUrl: 'home.component.html',
  styleUrls:['home.component.scss']
})

export class HomeComponent implements OnInit {

  spaceshipList : any[]=[];
  hasSelectedMenu = false;
  isLoadingData = true;
  starshipsExistingObjectNamesTable : string[] = this.homeService.starshipsExistingObjectNamesTable;


  constructor(
    private homeService:HomeService,
		public dialog: MatDialog,
  ){}

  ngOnInit() {
    this.homeService.loadData();
    this.homeService.dataSub.subscribe((data:any)=>{
      console.log(this.homeService.dataSub.value);
      if(
        data.films &&
        data.people &&
        data.planets &&
        data.species &&
        data.starships &&
        data.vehicles
        ){
          this.isLoadingData =false;
          this.spaceshipList = this.homeService.data.starships;
        }
    })



  }

  openSpaceshipDetailsDialog(spaceship:object){

    const dialogRef = this.dialog.open(ShowSpaceshipDetailsComponent,
      {
        width: '80%',
        maxHeight: '90vh',
        position: {
          top: '5%',
          left: '10%'
        },
        data:spaceship
	  	},

    );
  }



}
