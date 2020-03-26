import { Component,HostBinding,ViewEncapsulation, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OverlayContainer} from '@angular/cdk/overlay';
import { LocationService } from  '../service/location.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
 
  geolocationPosition : any;
  locationForm: FormGroup;
  infectedLocationPointCounts: number;
  infectedLocationPoints: any;
  mapType : string;
  searchingArea : boolean;
  snackBarConfig : any;

  constructor(
    public router: Router, 
    public overlayContainer: OverlayContainer, 
    private locationService: LocationService, 
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar){
      this.mapType = 'roadmap';
      this.searchingArea = false;
    }
    

  ngOnInit(): void {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 10000;

    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
                  this.geolocationPosition = position,
                  console.log(position)
          },
          error => {
              switch (error.code) {
                  case 1:
                      this.snackBar.open('Please allow location to proceed further',undefined,config);
                      console.log('Permission Denied');
                      break;
                  case 2:
                      this.snackBar.open('Location is unavailable',undefined,config);
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      this.snackBar.open('Tring to get the location since long',undefined,config);
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
    //throw new Error("Method not implemented.");
    
  }

  
  scanAreaForInfection(){
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 10000;
    this.searchingArea = true;

    console.log(this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude);
    this.locationService.scanareaforinfection(this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude).then((res)=>{
      this.infectedLocationPoints = res;
      console.log("Location point count : "+ this.infectedLocationPoints.length);
      this.searchingArea=false;
      

      if(this.infectedLocationPoints.length>0)
        this.snackBar.open('Prone to Infection. This location is not safe.',undefined,config);
      else
        this.snackBar.open('Not prone to Infection',undefined,config);
            
      //infectionPointCounts
    },(err) => { 
      console.log("Error" + err);
      this.snackBar.open('Error Occured',undefined,config);
      this.searchingArea=false;
    });

  }
  title = 'coronatracker';
}
