import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  logout() {
    localStorage.removeItem('token');
    if(this.router.url == environment.endPoints.home) {
      location.reload();
    }
    else {
      this.router.navigateByUrl(environment.endPoints.home);
    }
  }

}
