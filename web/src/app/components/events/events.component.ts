import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events:any = [] ;
  loading:boolean = true;

  constructor(private eventsService: EventsService, private router:Router) { }


  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getEvents().subscribe(
      (resp:any) => {
        this.events = resp.data;
        this.loading = false;
        console.log(this.events)
      },
      (error) => {
        console.log(error);
      })
  }

  goToEdit(id) {
    this.router.navigateByUrl(environment.endPoints.events + '/' + id)
  }

  delete(id) {
    Swal.fire({
      title: '¿Desea borrar este evento?',
      text: "Esta accion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventsService.deleteEvent(id).subscribe(
          (resp) => {
            this.getEvents();
             Swal.fire(
              'Borrado!',
              'El evento se borro exitosamente.',
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

}
