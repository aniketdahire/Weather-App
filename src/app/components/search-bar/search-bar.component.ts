import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {
    // The city name that user types in the input
    city: string = '';
    
    // This sends the search event up to the parent component
    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    // Called when user clicks the search button
    onSearch(){
      const trimmedCity = this.city.trim();
      // Don't search if input is empty
      if(!trimmedCity) return;
      
      // Send the city name to parent component
      this.search.emit(trimmedCity);
    }
    
    // Called when user presses Enter key in the input
    onEnter(event: Event) {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Enter') {
        this.onSearch();
      }
    }
}
