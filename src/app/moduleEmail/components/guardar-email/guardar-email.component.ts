import { Component, DoCheck, OnInit } from '@angular/core';


@Component({
  selector: 'app-guardar-email',
  templateUrl: './guardar-email.component.html',
  /* template: `<input type="text" [(ngModel)]="emailContact">
  <button (click)="guardarEmail()">Guardar</button>`, */
  styleUrls: ['./guardar-email.component.css']
})
export class GuardarEmailComponent{

  title = 'Guardar email';
  emailContact!: string;

  guardarEmail(){
    //console.log(this.emailContacto);
    localStorage.setItem('emailContact', this.emailContact);    
  }

}
