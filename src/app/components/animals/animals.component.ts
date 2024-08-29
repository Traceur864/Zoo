import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations.component';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  animations: [fadeIn]
})
export class AnimalsComponent implements OnInit{
    title = 'Animales';

    ngOnInit(): void {
        console.log('Animals working');
        
    }
}
