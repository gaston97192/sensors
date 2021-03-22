import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { SensorsService } from 'src/app/services/sensors.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  
  form: any = {};
  active: boolean = false;
  paramId: any;
  sensor: any = {};
  
  constructor( public formBuilder: FormBuilder, public activatedRoute: ActivatedRoute, public sensorsService: SensorsService, private router:Router) { } 

  ngOnInit(): void { 

    this.activatedRoute.params.subscribe((result) =>{

      this.paramId = result.id;

      if(this.paramId == 'create') {

        this.form = this.getFormNew() 
      }
      else {

        this.form = this.getFormEdit({})
        this.sensorsService.getSensor(this.paramId).subscribe(
          (resp:any) => {
            this.sensor = resp.data;
            this.form = this.getFormEdit(this.sensor)
            this.active = this.sensor.active
          }
        )
      }
    })

   }

  getFormNew(){
    return this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      minVal: [null, Validators.required],
      maxVal: [null, Validators.required],

    })
  }

  getFormEdit(item){
    return this.formBuilder.group({
      id: [item._id],
      name: [item.name, Validators.required],
      minVal: [item.minVal, Validators.required],
      maxVal: [item.maxVal, Validators.required],
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
    let sensor = this.form.value;
    sensor.active = this.active;

    if(sensor.maxVal <= sensor.minVal) {
      (Swal.fire('Error','El valor minimo debe ser mayor que el maximo','error'))
    }
    else {
      this.sensorsService.createSensor(sensor)
      .subscribe((resp) => {
        Swal.fire('Exito','Se guardo el sensor correctamente','success');
        this.router.navigateByUrl(environment.endPoints.sensors);
      },
        (error) => (Swal.fire('Error','Ocurrio un error al guardar','error')));
    }
  }

  update() {
    let sensor = this.form.value;
    sensor.active = this.active;

    if(sensor.maxVal <= sensor.minVal) {
      (Swal.fire('Error','El valor minimo debe ser mayor que el maximo','error'))
    }
    else {
      this.sensorsService.updateSensor(sensor)
      .subscribe((resp) => {
        Swal.fire('Exito','Se actualizo el sensor correctamente','success');
        this.router.navigateByUrl(environment.endPoints.sensors);
      },
        (error) => (Swal.fire('Error','Ocurrio un error al actualizar','error')));
    }
  }
}
