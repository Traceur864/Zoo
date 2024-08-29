import { Component, OnInit} from '@angular/core';
import { fadeIn } from '../animations.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fadeIn]
})
export class ContactComponent implements OnInit{

  title = 'Contacto';
  emailContact!: string;

  ngOnInit(): void {
      console.log('Contact working');
  }

  guardarEmail(){
    //console.log(this.emailContacto);
    localStorage.setItem('emailContact', this.emailContact);    
  }

}
