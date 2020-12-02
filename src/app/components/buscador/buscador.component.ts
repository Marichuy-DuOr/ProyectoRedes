import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from './../../services/mysql.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  public recetas;
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
    this.mysqlService.consulta(`${environment.API_URL}/buscarEdaman/${this.busqueda}`)
      .subscribe((res: any) => {
        console.log(res.hits);
        this.recetas = res.hits;
      });
  }

}
