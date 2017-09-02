
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

        //console.log(cursor);

        let maxDepth: number = -3;
        let direction: string = "forward";

        let cursorX: number = .1;
        let cursorY: number = 0;
        let cursorZ: number = -2;

        let playerX: number = 0;
        let playerY: number = 0;
        let playerZ: number = 0;

        let wandX: number = .1;
        let wandY: number = -1.5;
        let wandZ: number = -.4;



        setInterval(function(){

            if(direction == "forward"){

                cursorZ--;
                cursorY = -1;
                cursor.setAttribute('position', + cursorX + ' ' + cursorY + ' ' + cursorZ);

                if(cursorZ < maxDepth){

                    direction = "backward";
                }
            }
            if(direction == "backward"){

                cursorZ++;
                cursorY = -1;
                cursor.setAttribute('position', + cursorX + ' ' + cursorY + ' ' + cursorZ);

                if(cursorZ > -2){

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

        document.querySelector('#enemy1').addEventListener('click', function () {
            this.setAttribute('material', 'color', '#ffffff');
            this.removeChild();
            //document.querySelector('.enemy').remove();

            // let elems = document.getElementsByClassName("enemy");
            // for (let i = elems.length - 1; i >= 0; i--) {
            //     let parent = elems[i].parentNode;
            //     parent.removeChild(elems[i]);
            // }

        });

        //forward direction

        document.querySelector('#ForwardBox').addEventListener('click', function () {

            let player = document.querySelector('#player');
            let wand = document.querySelector('#Wand');
            let cursor = document.querySelector('.cursor');

            playerX += 1;
            playerY = 1.6;

            cursorX += 1;
            //cursorZ += 1;

            player.setAttribute('position', '1 1.6 0');
            wand.setAttribute('position', '1.1 -1.5 -.4');
            cursor.setAttribute('position', + cursorX + ' ' + cursorY + ' ' + cursorZ);
            //player.setAttribute('camera','userHeight', '1.6');
        });

        //   let controller = navigator.getGamepads();
        //   console.log(controller);

        //  for(var i = 0; i < controller.length; i++){

        //     if(controller[i] != null){

        //         alert("controller " + i + " is connected; controller map " + controller[i].mapping + "; controller button1 " + controller[i].buttons[0].pressed);
        //     }
        //  }

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