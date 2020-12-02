import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  img1: imagenes [] =[
    {nombre:"Salad", src:"../../assets/food1.jpg", id:9}, 
    {nombre:"Shellfish", src:"../../assets/food2.jpg", id:2},
    {nombre:"Pasta", src:"../../assets/food3.jpg", id:10}
  ];

  img2: imagenes [] =[
    {nombre:"Meat", src:"../../assets/food4.jpg", id:3}, 
    {nombre:"Dessert", src:"../../assets/food5.jpg", id:8},
    {nombre:"Breakfast", src:"../../assets/food6.jpg", id:4}
  ];

  img3: imagenes [] =[
    {nombre:"Traditional", src:"../../assets/food7.jpg", id:15},
    {nombre:"Drinks", src:"../../assets/food8.jpg", id:12},
    {nombre:"Soups", src:"../../assets/food9.jpg", id:14}
  ];
  constructor(private router: Router) { }

  verJoyas(item: any){
    this.router.navigate(['/buscador', item]);
  }

  ngOnInit(): void {
  }

}
 interface imagenes{
   nombre: string;
   src:string;
   id:number;
 }