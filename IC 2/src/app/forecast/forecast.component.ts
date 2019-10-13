import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from '../apixu.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public forecastData: any;

  constructor(private formBuilder: FormBuilder, private apixuService: ApixuService) {}


  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }
  sendToAPIXU(formValues) {
    // console.log(formValues.location);
    this.apixuService
      .getWeather(formValues.location)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      });
    this.apixuService
      .getForecast(formValues.location)
      .subscribe(data => {
        this.forecastData = data;
        console.log(this.forecastData);
      });

  }
}
