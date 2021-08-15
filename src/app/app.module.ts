import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HomeService } from './services/home.service';

import { HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ShowSpaceshipDetailsComponent } from './home/show-spaceship-details/show-spaceship-details.component';
import { ShowPilotDetailsComponent } from './home/show-pilot-details/show-pilot-details.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HomeLoaderComponent } from './home-loader/home-loader.component';


const MaterialModules =[
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowSpaceshipDetailsComponent,
    ShowPilotDetailsComponent,
    HomeLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModules,
  ],
  providers: [
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
