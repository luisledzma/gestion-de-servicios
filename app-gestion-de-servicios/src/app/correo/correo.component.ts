import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {
  href: string = "";
  constructor(private router: Router) { 
    this.href=this.router.url;
  }

  ngOnInit() {
    let p = JSON.parse(atob(this.href.split("?")[1].split("=")[1].split(".")[1])).unique_name;
    console.log(p);
  }
}
