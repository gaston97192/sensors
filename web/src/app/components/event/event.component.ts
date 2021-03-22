import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { EventsService } from 'src/app/services/events.service';
import { SensorsService } from 'src/app/services/sensors.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  form: any = {};
  active: boolean = false;
  paramId: any;
  sensors: [] = [];
  sensor: string = "";
  event: any = {};
  
  constructor( public formBuilder: FormBuilder, public activatedRoute: ActivatedRoute, public eventsService: EventsService, private router:Router, public sensorsService: SensorsService) { } 

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((result) =>{

      this.paramId = result.id;

      if(this.paramId == 'create') {

        this.form = this.getFormNew() 
      }
      else {
        this.form = this.getFormEdit({})
        this.eventsService.getEvent(this.paramId).subscribe(
          (resp:any) => {
            this.form = this.getFormEdit(resp.data)
            this.sensor = resp.data.sensorId._id;
            console.log(resp.data)
          }
        )
      }
    })
    this.getSensors();

   }

   getSensors() {
    this.sensorsService.getSensors().subscribe(
      (resp:any) => {
        this.sensors = resp.data
      }
    ),
    (error) => console.log(error)
   }

  getFormNew(){
    return this.formBuilder.group({
      id: [null],
      value: [null, Validators.required],
    })
  }

  getFormEdit(item){
    return this.formBuilder.group({
      id: [item._id],
      value: [item.value, Validators.required],
    })
  }

  onSubmit() {
    if(this.paramId == 'create') {
      this.save();
    }
    else {
      this.update();
    }
  }

  save() {
    let event = this.form.value;
    event.sensorId = this.sensor;

      this.eventsService.createEvent(event)
      .subscribe((resp) => {
        Swal.fire('Exito','Se guardo el evento correctamente','success');
        this.router.navigateByUrl(environment.endPoints.events);
      },
        (error) => (Swal.fire('Error','Ocurrio un error al guardar','error')));
    
  }

  update() {
    let event = this.form.value;
    event.sensorId = this.sensor;
    
      this.eventsService.updateEvent(event)
      .subscribe((resp) => {
        Swal.fire('Exito','Se actualizo el evento correctamente','success');
        this.router.navigateByUrl(environment.endPoints.events);
      },
        (error) => (Swal.fire('Error','Ocurrio un error al actualizar','error')));
    
  }
}
