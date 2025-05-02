import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  title = 'Dealer Hours Scheduler';
}
