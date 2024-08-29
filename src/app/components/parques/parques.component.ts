import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { fadeIn } from '../animations.component';
@Component({
  selector: 'app-parques',
  templateUrl: './parques.component.html',
  styleUrls: ['./parques.component.css'],
  animations: [fadeIn]
})
export class ParquesComponent implements OnChanges, OnInit, DoCheck, OnDestroy{
  @Input() nombre: string;
  @Input('metros_cuadrados') metros: number;
  public vegetacion: string;
  public abierto: boolean;

  @Output() pasameDatos = new EventEmitter();

  constructor(){
    this.nombre = 'Parque natural para caballos';
    this.metros = 450;
    this.vegetacion = 'Alta';
    this.abierto = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
      
  }

  ngOnInit(): void {
      console.log('metodo On init lanzado');
      
  }
  ngDoCheck(): void {
      console.log('El doCheck se ha ejecutado');
      
  }

  ngOnDestroy(): void {
      //this.emitirEvento
      console.log('se ejecuta');
      
  }

  emitirEvento(){
    this.pasameDatos.emit({
      'nombre': this.nombre,
      'metros': this.metros,
      'vegetacion': this.vegetacion,
      'abierto': this.abierto

    });
  }

}
