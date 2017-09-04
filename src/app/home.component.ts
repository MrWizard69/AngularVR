
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

        let scene = document.getElementById('Scene');

        this.aframe = this.elem.querySelector('a-scene');

        let cursor = document.querySelector('.cursor');

        let Enemy1Group = [];

        //console.log(cursor);    

        let cursorX: number = .1;
        let cursorY: number = 0;
        let cursorZ: number = -2;

        let playerX: number = 0;
        let playerY: number = 0;
        let playerZ: number = 0;

        let wandX: number = .1;
        let wandY: number = -1.5;
        let wandZ: number = -.4;

        //good for random positions: Math.round(Math.random() * (canvas.width * .90))

        let TestEnemy = {
            id: Enemy1Group.length,
            color: "orange",
            x: 2,
            y: 1.3,
            z: 1,
           draw: function() {
                let testObject = document.createElement('a-entity');
                testObject.setAttribute("id", "G1Enemy" + this.id);
                testObject.setAttribute('mixin', 'cube');
                testObject.setAttribute('position', this.x + " " + this.y + " " + this.z);
                testObject.setAttribute('material', 'color:' + this.color);
                //testObject.setAttribute('onclick', this.Clicked(this.id));
                scene.appendChild(testObject);
                
                //testObject.onmouseover = function(){ alert("Yo"); };

                setTimeout(function() {
                    testObject.parentNode.removeChild(testObject);
                }, 30);
                
            },
            Clicked: function(id){
                    
                //console.log(id);
                
                for(var i = 0; i < Enemy1Group.length; i++){

                    if(Enemy1Group[i].id == id){

                        Enemy1Group.splice(i, 1);
                        //console.log(Enemy1Group);
                    }
                }

            },
           movement: function(){
   
               //this will make direct the enemy move in the direction of the player
               if(this.x < playerX){
                   
                   this.x += 0.01; //0.02 is a good slow speed
               
               }
               if(this.x > playerX){
                   
                   this.x -= 0.01;
                   
               }
               if(this.z < playerZ){
                   
                   this.z += 0.01;
                   
               }
               if(this.z > playerZ){
                   
                   this.z -= 0.01;

               }
               
               
        }
            
    };

        let maxDepth: number = -3;
        let direction: string = "forward";

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

        },10);
   

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

            this.setAttribute('material', 'color', '#ffffff');//changes the color

            let enemy = document.querySelector('#enemy1');
            enemy.parentNode.removeChild(enemy); //deletes the entity

            Enemy1Group.push(TestEnemy); //pushes the object into the enemy array

            //Enemy1Group[Enemy1Group.length - 1].draw(); //draws the last object in the enemy array

            console.log(Enemy1Group);
            console.log(scene);
        });

        //main loop
        setInterval(function(){

            for(var i = 0; i < Enemy1Group.length; i++){

                Enemy1Group[i].draw(); // this will draw all the objects in the array
                Enemy1Group[i].movement(); // this will run the move function in the enemy object

                // document.querySelector('#G1Enemy' + Enemy1Group[i].id).addEventListener('mouseenter', function () {
                    
                //     console.log("Yo");
                // });

            }

        },30);

        function EnemyClick(id){

            console.log(id);
        }

        //forward direction

        // document.querySelector('#ForwardBox').addEventListener('click', function () {

        //     let player = document.querySelector('#player');
        //     let wand = document.querySelector('#Wand');
        //     let cursor = document.querySelector('.cursor');

        //     playerX += 1;
        //     playerY = 1.6;

        //     cursorX += 2;
        //     //cursorZ += 1;

        //     player.setAttribute('position', '2 1.6 0');
        //     wand.setAttribute('position', '2.1 -1.5 -.4');
        //     cursor.setAttribute('position', + cursorX + ' ' + cursorY + ' ' + cursorZ);
        //     //player.setAttribute('camera','userHeight', '1.6');
        // });

        //this is the gamepad thing

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

    // EnemyClick(id){
        
    //     console.log(id);
    // }

    over(){
        alert("Worked!");
    }
}