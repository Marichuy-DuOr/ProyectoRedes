import { Component, OnInit, Input } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { GraficarService } from './../../services/graficar.service';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styles: []
})
export class IngredienteComponent implements OnInit {

  public idIngrediente: any;
  public ingrediente;

  public ejeX = [];
  public ejeY = [];

  public ejeX2 = [];
  public ejeY2 = [];

  public ejeX3 = [];
  public ejeY3 = [];

  constructor(private activatedRoute: ActivatedRoute, private mysqlService: MysqlService, private graficarService: GraficarService) {
    this.activatedRoute.params.subscribe( params => {
      this.idIngrediente = params['id_ingrediente'];
    });
  }

  ngOnInit(): void {
    this.mysqlService.consulta(`${environment.API_URL}/ingredientSpoonacular/${this.idIngrediente}` )
    .subscribe((res: any) => {
      console.log(res);
      this.ingrediente = res;

      res.nutrition.nutrients.map(o => {
        if (o.unit === 'g' ) {
          this.ejeX.push(o.title);
          this.ejeY.push(o.amount);
        } else if (o.unit === 'mg') {
          this.ejeX2.push(o.title);
          this.ejeY2.push(o.amount);
        } else if (o.unit === 'µg') {
          this.ejeX3.push(o.title);
          this.ejeY3.push(o.amount);
        }
      });

      this.graficarService.create(this.ejeX, this.ejeY, 'bar', 'bar', 'Nutrients g');
      this.graficarService.create(this.ejeX2, this.ejeY2, 'bar2', 'pie', 'Nutrients mg');
      this.graficarService.create(this.ejeX3, this.ejeY3, 'bar3', 'pie', 'Nutrients mg');
    });
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
