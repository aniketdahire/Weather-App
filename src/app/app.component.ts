import { Component } from '@angular/core';
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
  // Component state - these get updated from the weather service
  weatherData: any = null;
  loading: boolean = false;
  errorMessage: string = '';
  forecastData: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // Listen to changes from the weather service
    // This way the UI updates automatically when data changes
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

    // Load the last searched city when the app starts
    this.weatherService.fetchLastCity();
  }

  // Called when user searches for a city
  onSearch(city: string) {
    this.weatherService.fetchWeather(city);
  }

  // Called when user clicks the X button on error message
  onErrorDismiss() {
    this.weatherService.error$.next('');
  }
}
