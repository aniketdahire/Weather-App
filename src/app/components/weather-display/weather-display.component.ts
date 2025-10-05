import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent {
  // Gets weather data from the parent component
  @Input() weatherData: any;
}
