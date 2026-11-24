import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';

@Component({
  imports: [],
  selector: 'app-assignments',
  styleUrl: './assignments.scss',
  templateUrl: './assignments.html',
})
export class Assignments {
  assignments = signal([] as any[]);

  constructor(private http:HttpClient) {
  	this.http.get('calendar.json').subscribe(calendar => {
  		this.parseCalendar(calendar as {});
  	});
  }

  parseCalendar(calendar:any) {
    let events:any[] = calendar['events'];
    //Add date string to each event
    events.map(e => {
      let hhmm = calendar['defaults']['assignment']['due'].split(":");
      let dueDate = moment(e['date']);
      dueDate.hours(hhmm[0]);
      dueDate.minutes(hhmm[1])
      e['due'] = dueDate.format('dddd, MMMM Do, h:mma');
      return e;
    });
    //Filter by type
    this.assignments.set(events.filter(e => e['type'] == 'assignment'));
  }
}
