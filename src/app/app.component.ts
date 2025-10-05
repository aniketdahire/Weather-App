import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoaderComponent } from './components/loader/loader.component';
import { WeatherService } from './service/weather.service';
import { ForecastDisplayComponent } from './components/forecast-display/forecast-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchBarComponent,
    WeatherDisplayComponent,
    CommonModule,
    ErrorMessageComponent,
    LoaderComponent,
    ForecastDisplayComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  weatherData: any = null;
  loading: boolean = false;
  errorMessage: string = '';
  forecastData: any[] = [];

  //handle search event from search bar component
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // Subscribe to service
    this.weatherService.weatherData$.subscribe(
      (data) => (this.weatherData = data)
    );
    this.weatherService.forecastData$.subscribe(
      (data) => (this.forecastData = data)
    );
    this.weatherService.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
    this.weatherService.error$.subscribe(
      (error) => (this.errorMessage = error)
    );

    // Fetch last searched city on load
    this.weatherService.fetchLastCity();
  }

  onSearch(city: string) {
    this.weatherService.fetchWeather(city);
  }
}
