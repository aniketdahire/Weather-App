import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = environment.weatherApiKey;
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';

  // State management
  weatherData$ = new BehaviorSubject<any>(null);
  forecastData$ = new BehaviorSubject<any[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  // Fetch current weather
  private fetchWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      map((res: any) => {
        if (res.cod && res.cod !== 200) {
          throw { status: res.cod, message: res.message || 'Error fetching weather' };
        }
        return res;
      }),
      catchError((err: HttpErrorResponse | any) => {
        let message = 'An unexpected error occurred';
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

  // Fetch 5-day forecast
  private fetchForecastData(city: string): Observable<any> {
    const url = `${this.forecastUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      catchError((err: HttpErrorResponse | any) => {
        let message = 'An unexpected error occurred';
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) message = 'City not found.';
          else if (err.status === 401) message = 'Invalid API key.';
          else if (err.status === 0) message = 'Network error.';
        }
        return throwError(() => ({ status: err.status || 0, message }));
      })
    );
  }

  // Public method to fetch both current weather & forecast
  fetchWeather(city: string) {
    this.loading$.next(true);
    this.error$.next('');
    localStorage.setItem('lastCity', city);

    // Current weather
    this.fetchWeatherData(city).subscribe({
      next: data => {
        this.weatherData$.next(data);
        this.loading$.next(false);
      },
      error: err => {
        this.weatherData$.next(null);
        this.loading$.next(false);
        this.error$.next(err.message || 'Failed to fetch weather');
      }
    });

    // Forecast
    this.fetchForecastData(city).subscribe({
      next: (data: any) => {
        if (data && data.list) {
          this.forecastData$.next(data.list.slice(0, 5)); // first 5 forecast entries
        } else {
          this.forecastData$.next([]);
        }
      },
      error: () => this.forecastData$.next([])
    });
  }

  // Fetch weather for last searched city from localStorage
  fetchLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) this.fetchWeather(lastCity);
  }
}
