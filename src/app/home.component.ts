
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
        let maxDepth = -3;
        let north = 1;
        let direction = "forward";


        setInterval(function(){

            if(direction == "forward"){

                depth--;
                north--;
                cursor.setAttribute('position', '0.1 '+ -1 + ' ' + depth);

                if(depth < maxDepth){

                    direction = "backward";
                }
            }
            if(direction == "backward"){

                depth++;
                north++;
                cursor.setAttribute('position', '0.1 '+ -1 + ' ' + depth);

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

          let controller = navigator.getGamepads();
          console.log(controller);

         for(var i = 0; i < controller.length; i++){

            if(controller[i] != null){

                alert("controller " + i + " is connected; controller map " + controller[i].mapping + "; controller button1 " + controller[i].buttons[0].pressed);
            }
         }

        //This is an experiment for a GearVR controller

        // setInterval(function(){

        //     for(var i = 0; i < controller.length; i++){

        //         if(controller[i] != null){

        //             //alert(controller[i].buttons.length);

        //             // if(controller[i].buttons[0].pressed == true){

        //             //     alert("button " + i);
        //             // }
        //             // if(controller[i].buttons[1].pressed == true){

        //             //     alert("button " + i);
        //             // }
        //             // if(controller[i].buttons[2].pressed == true){

        //             //     alert("button " + i);
        //             // }
        //     }
        //  }

        // },30);

          

        //   alert(controller[0].buttons[0].value);
        //   alert(controller[0].buttons[1].value);
        //   alert(controller[0].buttons[2].value);
        //   alert(controller[0].buttons[3].value);
        
    }

    over(){
        alert("Worked!");
    }
}