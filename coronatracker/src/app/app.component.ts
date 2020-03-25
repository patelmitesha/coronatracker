import { Component, OnInit } from '@angular/core';
import { LocationService } from  '../service/location.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  geolocationPosition : any;
  locationForm: FormGroup;
  infectedLocationPointCounts: number;
  infectedLocationPoints: any;

  constructor( private locationService: LocationService, 
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar){}

  ngOnInit(): void {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
                  this.geolocationPosition = position,
                  console.log(position)
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
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

    console.log(this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude);
    this.locationService.scanareaforinfection(this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude).then((res)=>{
      this.infectedLocationPoints = res;
      console.log("Location point count : "+ this.infectedLocationPoints.length);
      if(this.infectedLocationPoints.length>0)
        this.snackBar.open('Prone to Infection. This location is not safe.',undefined,config);
      else
        this.snackBar.open('Not prone to Infection',undefined,config);
            
      //infectionPointCounts
    },(err) => { 
      console.log("Error" + err);
      this.snackBar.open('Error Occured',undefined,config);
    });
  }
  title = 'coronatracker';
}
