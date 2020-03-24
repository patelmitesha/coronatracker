import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  scanareaforinfection(lat,lon) {

    console.log("Lat"+ lat + ", Lon : "+lon);
    let header=new Headers();
     // header.append('x-access-token',localStorage.getItem("token"));
      

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/scanareaforinfection',
      {
          "lat": lat,
          "lon": lon
      })
        .subscribe(res => {
          console.log('success');
          resolve(res);
        }, (err) => {
          console.log('failure');
          console.log(err);
          reject(err);
        });
    });
}
}