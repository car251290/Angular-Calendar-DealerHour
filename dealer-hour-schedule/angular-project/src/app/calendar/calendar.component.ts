import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CalendarComponent {
  salesperson = ''; 
  eventTime = ''; 
  events = [
    { title: 'Test Meeting', start: '2025-05-01T10:00:00', end: '2025-05-01T11:00:00', salesperson: '', highlight: false },
  ]; 
 // List of dealers with their schedules
 dealers = [
  { name: 'Alice', start: 9, end: 18 }, // 9 AM to 6 PM
  { name: 'Bob', start: 8, end: 17 },  // 8 AM to 5 PM
  { name: 'Charlie', start: 10, end: 19 }, // 10 AM to 7 PM
  { name: 'Diana', start: 7, end: 15 }, // 7 AM to 3 PM
  { name: 'Eve', start: 9, end: 18 }, // 9 AM to 6 PM
  { name: 'Frank', start: 8, end: 16 }, // 8 AM to 4 PM
  { name: 'Grace', start: 11, end: 20 }, // 11 AM to 8 PM
  { name: 'Hank', start: 6, end: 14 }  // 6 AM to 2 PM
];

  dealerHours = { start: 9, end: 18 }; 
  dealerHoursEnabled = true; 

  addEvent(dateStr: string, salesperson: string) {
    const newStart = new Date(dateStr);

    if(!salesperson.trim()){
      salesperson = 'Unkown SalesPerson';
      alert('Salesperson is not selected. Defaulting to "Unknown SalesPerson".');
    }
    const dealer = this.dealers.find(d => d.name === salesperson);

    if(!dealer){
      alert('Salesperson not found in dealer list.');
      return;
    }


    // Validate dealer hours
    if ( this.isOutsideDealerHours(newStart,dealer)) {
      alert(`Event is outside dealer hours. ${salesperson} is available from ${dealer.start}:00 to ${dealer.end}:00`);
      return;
    }

    // Check for overlapping events
    if (this.hasOverlap(newStart, salesperson)) {
      alert('Salesperson has overlapping events.');
      return;
    }

    // Add the new event
    const newEvent = {
      title: 'New Event',
      start: dateStr,
      end: new Date(newStart.getTime() + 60 * 60 * 1000).toISOString(),
      salesperson,
      highlight: true 
    };

    this.events.push(newEvent);

    // Remove the highlight after 2 seconds
    setTimeout(() => {
      newEvent.highlight = false;
    }, 2000);

    alert('Event added successfully!');
  }

  isOutsideDealerHours(newStart: Date, dealer: { start: number; end: number }): boolean {
    const hour = newStart.getHours();
    return hour < dealer.start || hour >= dealer.end;
  }

  hasOverlap(newStart: Date, salesperson: string): boolean {
    return this.events.some(event =>
      event.salesperson === salesperson &&
      newStart >= new Date(event.start) &&
      newStart < new Date(event.end)
    );
  }
}