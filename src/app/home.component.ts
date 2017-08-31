
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

        let cursor = document.querySelector('.cursor');

        console.log(cursor);

        let depth = -1;
        let maxDepth = -5;
        let north = 1;
        let direction = "forward";

        setInterval(function(){

            if(direction == "forward"){

                depth--;
                north--;
                cursor.setAttribute('position', '0 '+ 0 + ' ' + depth);

                if(depth < maxDepth){

                    direction = "backward";
                }
            }
            if(direction == "backward"){

                depth++;
                north++;
                cursor.setAttribute('position', '0 '+ 0 + ' ' + depth);

                if(depth > -2){

                    direction = "forward";
                }
            }

        },30);

        console.log(this.aframe);

        document.querySelector('#hexagon').addEventListener('mouseenter', function () {
            this.setAttribute('material', 'color', 'blue');
        });
        
        document.querySelector('#hexagon').addEventListener('mouseleave', function () {
            this.setAttribute('material', 'color', '#EF2D5E');
        });

        document.querySelector('#hexagon').addEventListener('click', function () {
            this.setAttribute('material', 'color', '#ffffff');
        });
    }

    over(){
        alert("Worked!");
    }
}