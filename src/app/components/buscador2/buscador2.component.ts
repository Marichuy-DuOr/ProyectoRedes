import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from './../../services/mysql.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-buscador2',
  templateUrl: './buscador2.component.html',
  styles: []
})
export class Buscador2Component implements OnInit {

  public food;
  public nutrients = [];
  public etiquetas = [];
  public busqueda;

  constructor( public activatedRoute: ActivatedRoute, private mysqlService: MysqlService ) {

    this.activatedRoute.params.subscribe( params => {
      this.busqueda = params['busquedaEdaman'];
      this.actualizar();
    });

  }

  ngOnInit(): void {
  }

  public actualizar() {
    this.mysqlService.consulta(`${environment.API_URL}/buscar2Edaman/${this.busqueda}`)
      .subscribe((res: any) => {
        console.log(res);
        this.food = res.parsed[0].food;
        console.log(this.food);

        this.nutrients = res.hints;
        console.log(this.nutrients);
      });
  }

}
