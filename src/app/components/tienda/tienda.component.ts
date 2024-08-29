import { Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fadeIn } from '../animations.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [
    trigger('marcar', [
      state('inactive', style({
        border: '5px solid #ccc'
      })),
      state('active', style({
        border:'5px solid yellow',
        background: 'red',
        borderRadius: '50px',
        transform: 'sacle(1.2)'
      })),
      transition('inactive => active', animate('3s linear')),
      transition('active => inactive', animate('3s linear'))
    ]),
    fadeIn
  ]
})
export class TiendaComponent implements OnInit{

  public titulo: any;
  public nombreDelParque: string | undefined;
  public miParque: any;
  public status: any;

  constructor(){
    this.titulo = 'Tienda';
    this.status = 'inactive';
  }

  cambiarEstado(status:any){
    if(status == 'inactive'){
      this.status = 'active';
    }else{
      this.status = 'inactive';
    }
  }

  ngOnInit(): void {
      
  }

  mostrarNombre(){
    console.log(this.nombreDelParque); 
  }

  verDatosParque(event: any){
    console.log(event);
    this.miParque = event;
  }
}
