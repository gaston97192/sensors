import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor( private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getEvents() {
    const url = environment.baseUrl + environment.endPoints.events;
    return this.http.get( url, this.headers)
  }

  getEvent(id) {
    const url = environment.baseUrl + environment.endPoints.events + '/' + id;
    return this.http.get( url, this.headers)
  }

  createEvent(item) {
    const url = environment.baseUrl + environment.endPoints.events;
    return this.http.post( url, item ,this.headers)
  }

  updateEvent(item) {
    const url = environment.baseUrl + environment.endPoints.events + '/' + item.id;
    return this.http.put( url, item ,this.headers)
  }

  deleteEvent(id) {
    const url = environment.baseUrl + environment.endPoints.events + '/' + id;
    return this.http.delete( url ,this.headers)
  }
}
