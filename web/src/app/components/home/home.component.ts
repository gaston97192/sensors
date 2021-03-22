import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any = localStorage.getItem('token') || false;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  

  generateToken() {
    this.authService.login().subscribe(
      (resp:any) => {
        this.token = resp.data;
        localStorage.setItem('token', this.token)
        Swal.fire('Exito', 'Token generado exitosamente','success')
      },
      (error) =>{
        Swal.fire('Error', 'Ocurrio un error','error')
        console.log(error)
      }
    )
  }

}
