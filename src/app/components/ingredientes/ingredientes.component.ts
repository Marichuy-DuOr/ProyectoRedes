import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styles: []
})
export class IngredientesComponent implements OnInit {

  public ingredientes = [];
  public band;
  public band2;

  constructor(private mysqlService: MysqlService) { }

  ngOnInit(): void {
    this.band = true;
    this.band2 = true;
  }

  buscar(busqueda: string) {
    this.band2 = false;
    this.ingredientes = [];
    this.mysqlService.consulta(`${environment.API_URL}/ingredientsSpoonacular/${busqueda}`)
      .subscribe((res: any) => {
        console.log(res);
        this.ingredientes = res.results;
        if (this.ingredientes.length > 0) {
          this.band = true;
        } else {
          this.band = false;
        }
      });
  }

}
