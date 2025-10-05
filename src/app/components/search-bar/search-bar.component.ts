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
    city: string = '';
    //use for emitting the search event to parent component
    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    //emit the search event with the city name
    onSearch(){
      const trimmedCity = this.city.trim();
      if(!trimmedCity) return; //if input is empty, do nothing
        this.search.emit(trimmedCity);
      
    }
    //handle enter key press
    onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent; // Type assertion
    if (keyboardEvent.key === 'Enter') {
      this.onSearch();
    }
  }
}
