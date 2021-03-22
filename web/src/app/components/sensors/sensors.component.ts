import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorsService } from 'src/app/services/sensors.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  sensors:any = [] ;
  loading:boolean = true;
  sensorsFiltered: [] = [];
  events: [] = [];

  constructor( private sensorsService: SensorsService, private router:Router) { }

  ngOnInit(): void {
    this.getSensors();
  }

  getSensors() {
    this.sensorsService.getSensors().subscribe(
      (resp:any) => {
        this.sensors = resp.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      })
  }


  goToEdit(id) {
    this.router.navigateByUrl(environment.endPoints.sensors + '/' + id)
  }

  delete(id) {
    Swal.fire({
      title: '¿Desea borrar este sensor?',
      text: "Esta accion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sensorsService.deleteSensor(id).subscribe(
          (resp) => {
            this.getSensors();

             Swal.fire(
              'Borrado!',
              'El sensor se borro exitosamente.',
              'success'
            )
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Ocurrio un error al borrar.',
              'error'
            )
            console.log(error)
          }
        )

      }

    })

  }

  openModal(sensorId) {
    this.sensorsService.getEventsOfSensor(sensorId).subscribe(
      ( resp:any ) => {
        this.events = resp.data;
      },
      (error) => (console.log(error))
    )
  }

}
