import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';

@Component({
	selector: 'show-pilot-details',
	templateUrl: 'show-pilot-details.component.html',
  styleUrls:['show-pilot-details.component.scss']
})

export class ShowPilotDetailsComponent implements OnInit {

  filmsList:any[] =[];
  vehiclesList : any[] = [];
  starshipsList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public pilotInfos:any,
    private dialogRef:MatDialogRef<ShowPilotDetailsComponent>,
    private homeService:HomeService
  ){}


	ngOnInit() {
    console.log(this.pilotInfos);
    this.pilotInfos.films.forEach((film:string) => {
      this.filmsList.push(this.homeService.data.films.find((serviceFilm:any) => serviceFilm.url == film));
    });
    console.log(this.filmsList);

    this.pilotInfos.vehicles.forEach((vehicle:string) => {
      this.vehiclesList.push(this.homeService.data.vehicles.find((serviceVehicle:any) => serviceVehicle.url == vehicle));
    });


    this.pilotInfos.starships.forEach((starship:string) => {
      this.starshipsList.push(this.homeService.data.starships.find((serviceStarship:any) => serviceStarship.url == starship));
    });
    console.log(this.filmsList);
  }

}
