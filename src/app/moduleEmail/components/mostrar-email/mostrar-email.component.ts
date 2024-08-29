import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-email',
  templateUrl: './mostrar-email.component.html',
  template:`
  <span *ngIf="emailContacto"><strong>Email de Contacto:</strong>{{emailContacto}}
    <button (click)="borrarEmail()">Eliminar email</button></span>`,
  styleUrls: ['./mostrar-email.component.css']
})
export class MostrarEmailComponent implements DoCheck, OnInit{

  title = 'Mostrar email';
  emailContact!: string | null;

  ngOnInit(): void{
    this.emailContact = localStorage.getItem('emailContact');
  }

  ngDoCheck():void{
    this.emailContact = localStorage.getItem('emailContact');
  }

  borrarEmail(){
    localStorage.removeItem('emailContact');
    localStorage.clear();
    this.emailContact = null;
  }


}
