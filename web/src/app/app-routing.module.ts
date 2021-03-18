import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { SensorsComponent } from './components/sensors/sensors.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'sensors/:id', component: SensorComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventComponent },
  { path:'**', redirectTo:'home', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
