import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  generateToken() {
    console.log('eeeeeeeeeeeee')
    this.token = true;
    console.log(this.token)
  }

}
