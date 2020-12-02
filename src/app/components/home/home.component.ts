import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  img1: imagenes [] =[
    {nombre:"Compromiso", src:"../../assets/food1.jpg", id:9}, 
    {nombre:"Anillos", src:"../../assets/food2.jpg", id:2},
    {nombre:"Alinzas", src:"../../assets/food3.jpg", id:10}
  ];

  img2: imagenes [] =[
    {nombre:"Colgantes", src:"../../assets/food4.jpg", id:3}, 
    {nombre:"Pendientes", src:"../../assets/food5.jpg", id:8},
    {nombre:"Pulseras", src:"../../assets/food6.jpg", id:4}
  ];

  img3: imagenes [] =[
    {nombre:"Esclavas", src:"../../assets/food7.jpg", id:15},
    {nombre:"Gemelos", src:"../../assets/food8.jpg", id:12},
    {nombre:"Cadenas", src:"../../assets/food9.jpg", id:14}
  ];
  constructor(private router: Router) { }

  verJoyas(item: any){
    this.router.navigate([ '/joyas', item ]);
  }

  ngOnInit(): void {
  }

}
 interface imagenes{
   nombre: string;
   src:string;
   id:number;
 }