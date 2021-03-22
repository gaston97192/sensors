import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sensors', component: SensorsComponent, canActivate:[AuthGuard] },
  { path: 'sensors/:id', component: SensorComponent, canActivate:[AuthGuard] },
  { path: 'events', component: EventsComponent, canActivate:[AuthGuard] },
  { path: 'events/:id', component: EventComponent, canActivate:[AuthGuard] },
  { path:'**', redirectTo:'home', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
