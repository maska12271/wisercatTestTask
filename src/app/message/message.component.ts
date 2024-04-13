import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() text: string = '';
  @Input() type: 'info' | 'error' | 'success' = 'info';
  hide: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.hide = true;
    }, 2500);
  }

  get messageClasses(): { [key: string]: boolean } {
    return {
      'info': this.type === 'info',
      'error': this.type === 'error',
      'success': this.type === 'success',
      'hide': this.hide
    };
  }
}
