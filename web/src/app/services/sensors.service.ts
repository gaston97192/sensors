import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

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

  getSensors() {
    const url = environment.baseUrl + environment.endPoints.sensors;
    return this.http.get( url, this.headers)
  }

  getSensor(id) {
    const url = environment.baseUrl + environment.endPoints.sensors + '/' + id;
    return this.http.get( url, this.headers)
  }

  getEventsOfSensor(id) {
    const url = environment.baseUrl + environment.endPoints.sensors + environment.endPoints.events + '/' + id;
    return this.http.get( url, this.headers)
  }

  createSensor(item) {
    const url = environment.baseUrl + environment.endPoints.sensors;
    return this.http.post( url, item ,this.headers)
  }

  updateSensor(item) {
    const url = environment.baseUrl + environment.endPoints.sensors + '/' + item.id;
    return this.http.put( url, item ,this.headers)
  }

  deleteSensor(id) {
    const url = environment.baseUrl + environment.endPoints.sensors + '/' + id;
    return this.http.delete( url ,this.headers)
  }
}
