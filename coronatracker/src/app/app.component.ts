import { Component, OnInit } from '@angular/core';
import { LocationService } from  '../service/location.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  geolocationPosition : any;
  locationForm: FormGroup;

  constructor( private locationService: LocationService, private formBuilder: FormBuilder){}

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
    

    console.log(this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude);
    this.locationService.scanareaforinfection(this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude).then((res)=>{
      console.log("Success : "+ res);
    },(err) => { 
      console.log("Error" + err);
    });
  }
  title = 'coronatracker';
}
