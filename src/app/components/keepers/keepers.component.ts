import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations.component';
@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  styleUrls: ['./keepers.component.css'],
  animations: [fadeIn]
})
export class KeepersComponent implements OnInit{
  title = 'Cuidadores';
  
  ngOnInit(): void {
      console.log('Keepers funcionando');
      
  }
}
