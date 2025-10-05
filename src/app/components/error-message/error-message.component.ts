import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  // The error message to display
  @Input() errorMessage: string = '';
  
  // Event emitted when user clicks the close button
  @Output() dismiss = new EventEmitter<void>();

  // Called when user clicks the X button
  onDismiss() {
    this.dismiss.emit();
  }
}
