import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Correct the "styleUrl" to "styleUrls"
  animations: [
    trigger('pageAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
  ],
  
})
export class AppComponent {
  title = 'client';
  currentView: string = 'summary'; // Set initial view

  public setView(view: string): void {
    this.currentView = view;
  }
}
