import { Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-email',
  templateUrl: './main-email.component.html',
  /* template: `<app-mostrar-email></app-mostrar-email>
             <app-guardar-email></app-guardar-email>`, */
  styleUrls: ['./main-email.component.css']
})
export class MainEmailComponent implements DoCheck, OnInit{

  title = 'Modulo de email';
  

  ngOnInit(): void {
    console.log("componente principal cargado");
    
  }

  ngDoCheck():void{

  }

 
}
