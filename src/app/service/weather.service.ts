import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError, BehaviorSubject, forkJoin, timer } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // API configuration - using OpenWeatherMap free tier
  private apiKey: string = API_CONFIG.WEATHER_API_KEY;
  private apiUrl: string = API_CONFIG.WEATHER_API_URL;
  private forecastUrl: string = API_CONFIG.FORECAST_API_URL;

  // Using BehaviorSubjects for reactive state management
  // This way components can subscribe to changes automatically
  weatherData$ = new BehaviorSubject<any>(null);
  forecastData$ = new BehaviorSubject<any[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  // Get current weather data for a city
  private fetchWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      map((res: any) => {
        // OpenWeatherMap sometimes returns error codes in the response body
        if (res.cod && res.cod !== 200) {
          throw { status: res.cod, message: res.message || 'Error fetching weather' };
        }
        return res;
      }),
      catchError((err: HttpErrorResponse | any) => {
        // Handle different types of errors with user-friendly messages
        let message = 'Something went wrong';
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) message = 'Network error. Check your connection.';
          else if (err.status === 401) message = 'Invalid API key (401).';
          else if (err.status === 404) message = 'City not found.';
          else if (err.error?.message) message = err.error.message;
          else message = `Error ${err.status}: ${err.statusText}`;
        } else if (err.message) {
          message = err.message;
        }
        return throwError(() => ({ status: err.status || 0, message }));
      })
    );
  }

  // Get 5-day weather forecast for a city
  private fetchForecastData(city: string): Observable<any> {
    const url = `${this.forecastUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      catchError((err: HttpErrorResponse | any) => {
        // Forecast errors are less critical, so we don't show them to user
        // Just return empty array if forecast fails
        let message = 'Forecast unavailable';
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) message = 'City not found.';
          else if (err.status === 401) message = 'Invalid API key.';
          else if (err.status === 0) message = 'Network error.';
        }
        return throwError(() => ({ status: err.status || 0, message }));
      })
    );
  }

  // Main method called by components to get weather data
  fetchWeather(city: string) {
    this.loading$.next(true);
    this.error$.next('');
    
    // Clear old data so user sees clean loading state
    this.weatherData$.next(null);
    this.forecastData$.next([]);
    
    // Save the searched city for next time
    localStorage.setItem('lastCity', city);

    // Add minimum loading time so spinner is visible (better UX)
    const minLoadingTime = timer(800);
    
    // Make both API calls at the same time for faster loading
    const weatherRequest = this.fetchWeatherData(city);
    const forecastRequest = this.fetchForecastData(city);

    // Wait for both requests to complete (or fail) before hiding loader
    forkJoin([weatherRequest, forecastRequest, minLoadingTime]).subscribe({
      next: ([weatherData, forecastData]) => {
        // Update the current weather display
        this.weatherData$.next(weatherData);
        
        // Process forecast data - take first 5 entries
        if (forecastData && forecastData.list) {
          this.forecastData$.next(forecastData.list.slice(0, 5));
        } else {
          this.forecastData$.next([]);
        }
        
        // All done, hide the loading spinner
        this.loading$.next(false);
      },
      error: err => {
        // Something went wrong, clear everything and show error
        this.weatherData$.next(null);
        this.forecastData$.next([]);
        this.loading$.next(false);
        this.error$.next(err.message || 'Failed to fetch weather');
      }
    });
  }

  // Load the last searched city when app starts
  fetchLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      this.fetchWeather(lastCity);
    }
  }
}
