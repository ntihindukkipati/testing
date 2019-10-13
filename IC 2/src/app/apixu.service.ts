import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) {
  }
errorMessageText = 'The city name you have entered is incorrect. Please enter a valid city name.';
  getWeather(location) {
    return this.http.get(
      'https://api.apixu.com/v1/current.json?key=aca39b995d1241e78b300948193108&q=' + location

    );
  }

  getForecast(location) {
    console.log(location);
    return this.http.get(
      'https://api.apixu.com/v1/forecast.json?key=aca39b995d1241e78b300948193108&q=' + location
    );
  }
}
