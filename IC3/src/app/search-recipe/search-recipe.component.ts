import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare const responsiveVoice: any;

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  @ViewChild('nu') nus: ElementRef;

  nuv: any;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  nul = [];
  currentLat: any;
  currentLong: any;
  geolocationPosition: any;
  a : any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;


    if (this.recipeValue !== null) {
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=d71c1b0b&app_key=6409c1f27efe28a6cfd16b06ddfd762b&from=0&to=3')
        .subscribe((data: any) => {
          for (let i = 0; i < data.hits.length; i++) {
               this.recipeList[i] = {
              'name': data.hits[i].recipe.label,
              'url': data.hits[i].recipe.url,
              'icon': data.hits[i].recipe.image
            };
          }
        });

    }



    if (this.placeValue != null && this.placeValue != '' && this.recipeValue != null && this.recipeValue != '') {
      this._http.get('https://api.foursquare.com/v2/venues/search' +
        '?client_id=3PPNMTIKJJNDVYPFOBGSHHV2PR5A2P05PYHXDN2MKSKTTBSX' +
        '&client_secret=0QPHT0F5RS043F4TB4KKPQSHKSAXKE5ZNOYGB5KL2MBDYAG4' +
        '&v=20160215&limit=5' +
        '&near=' + this.placeValue +
        '&query=' + this.recipeValue)
        .subscribe((data: any) => {
          for (let i = 0; i < data.response.venues.length; i++) {
            this.venueList[i] = {
              'name': data.response.venues[i].name,
              'id': data.response.venues[i].id,
              'location': data.response.venues[i].location
            };
            console.log(this.venueList[i]);

          }

        });
    }
var data;
    if (this.recipeValue !== null) {
      this._http.get('http://api.nutritionix.com/v1_1/search/q='+this.recipeValue+'?results=0:1&fields=*&appId=b9be9935&appKey=2890d6bfefaed1d85ab492c8cea5ddae')
        .subscribe((data: any) => {
          for (let i = 0; i < data.hits.length; i++) {
            this.nul[i] = {
              'name': data.hits[i].fields.nf_total_fat,
              'url': data.hits[i].fields.nf_cholesterol,


          };

          }

        });


      responsiveVoice.speak("if you are eating "+ this.recipeValue+"then total fat in grams is "+ this.nul[0].hits[0].fields.nf_total_fat+"and vitamin c is " +this.nul[0].hits[0].fields.nf_cholesterol);


    }

}
}
