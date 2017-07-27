
import { Component, Input, OnInit, ElementRef  } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    elem: any;
    aframe: any;
    timeout: any;

  title = 'Home Page';

  constructor(ref: ElementRef) {
        this.elem = ref.nativeElement;
    }

    ngOnInit(){
        
        console.log("You are on the home page");
        this.aframe = this.elem.querySelector('a-scene');

        console.log(this.aframe);

        document.querySelector('#hexagon').addEventListener('mouseenter', function () {
            this.setAttribute('material', 'color', 'blue');
        });
        
        document.querySelector('#hexagon').addEventListener('mouseleave', function () {
            this.setAttribute('material', 'color', '#EF2D5E');
        });
    }

    over(){
        alert("Worked!");
    }
}