import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-display.component.html',
  styleUrl: './forecast-display.component.css'
})
export class ForecastDisplayComponent {
  // Array of forecast data for the next 5 days
  @Input() forecastData: any[] = [];
}
