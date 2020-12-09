import { Component, OnInit, Input } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { GraficarService } from './../../services/graficar.service';

@Component({
  selector: 'app-receta-edamam',
  templateUrl: './receta-edamam.component.html',
  styles: []
})
export class RecetaEdamamComponent implements OnInit {

  @Input() uri: any;
  public receta;
  public nutrients = [];
  public bandera;
  public body;

  public ejeX = [];
  public ejeY = [];

  public ejeX2 = [];
  public ejeY2 = [];

  public ejeX3 = [];
  public ejeY3 = [];

  constructor(private activatedRoute: ActivatedRoute, private mysqlService: MysqlService, private graficarService: GraficarService) {
    this.activatedRoute.params.subscribe( params => {
      this.uri = params['uri'];
    });
  }

  ngOnInit(): void {
    console.log(this.uri);
    let r = this.uri.indexOf("#");
    console.log(r);
    if(r != -1){
      const elUri = this.uri.split('#');
       this.body = {
        uri: elUri[1]
      };
    }else{
      this.body = {
        uri: this.uri
      };
    }
    
    this.mysqlService.alta(`${environment.API_URL}/recipeEdamam`, this.body)
    .then((laData) => {
      console.log(laData);

      this.receta = laData[0];
      console.log(this.receta);

      let cont = 0;
      for(let i in laData[0].totalNutrients){
        this.nutrients[cont] = laData[0].totalNutrients[i];
        cont = cont + 1;
      }

      laData[0].digest.map(o => {
          this.ejeX.push(o.label);
          this.ejeY.push(o.total);
        
      });
      this.graficarService.create(this.ejeX, this.ejeY, 'bar', 'pie', 'Digest');

      this.nutrients.map(o => {
        if (o.unit === 'g' ) {
          this.ejeX2.push(o.label);
          this.ejeY2.push(o.quantity);
        
        }
      });
      this.graficarService.create(this.ejeX2, this.ejeY2, 'bar2', 'bar', 'Nutrients g');

      this.nutrients.map(o => {
        if (o.unit === 'g' ) {
          this.ejeX2.push(o.label);
          this.ejeY2.push(o.quantity);
        } else if (o.unit === 'mg') {
          this.ejeX3.push(o.label);
          this.ejeY3.push(o.quantity);
        }
      });
      this.graficarService.create(this.ejeX3, this.ejeY3, 'bar3', 'pie', 'Nutrients mg');

      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  public agregar(receta) {
    const elUri = receta.uri.split('#');
    const uri_receta= elUri[1];
    this.mysqlService.consulta(`${environment.API_URL}/userRecipeEdamam/${uri_receta}`)
      .subscribe((res: any) => {
        console.log(res.array);
        if (res.array.length > 0){
          this.mysqlService.delete(`${environment.API_URL}/userRecipeEdamam/${res.array[0].id}`)
          .subscribe((res2: any) => {
            document.getElementById('dos').style.display = 'block';
            setTimeout(() => document.getElementById('dos').style.display = 'none', 2000);
          });
        } else {
          
          const data = {
            uri_receta: elUri[1],
            label: receta.label,
            source: receta.source,
            image: receta.image
          };
          this.mysqlService.alta(`${environment.API_URL}/userRecipeEdamam`, data)
          .then((laData) => {
            console.log(laData);
            document.getElementById('uno').style.display = 'block';
            setTimeout(() => document.getElementById('uno').style.display = 'none', 2000);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
