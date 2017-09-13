
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
        
        //document where and what everything is for later use.
        console.log("You are on the home page");

        let scene = document.getElementById('Scene');

        this.aframe = this.elem.querySelector('a-scene');

        let cursor = document.querySelector('.cursor');

        let Enemy1Group = [];
        let EnemyCount: number = -1;

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

        //This is the first enemy object
        let TestEnemy = {
            id: 0,
            color: "orange",
            x: Math.floor((Math.random() * -10) + 5),//2,
            y: 1.3,
            z: Math.floor((Math.random() * -10) + 5),//1,
            
    };

        //this controlls the cursors depth of selection
        let maxDepth: number = -5;
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

        },5);
   
        //console.log(this.aframe);

        //this handles all the interactions
        // document.querySelector('#hexagon').addEventListener('mouseenter', function () {
        //     this.setAttribute('material', 'color', 'blue');
        // });
        
        // document.querySelector('#hexagon').addEventListener('mouseleave', function () {
        //     this.setAttribute('material', 'color', '#EF2D5E');
        // });

        // document.querySelector('#hexagon').addEventListener('click', function () {
        //     this.setAttribute('material', 'color', '#ffffff');
        // });

        document.querySelector('#start').addEventListener('click', function () { //mouseenter click

            //this.setAttribute('material', 'color', '#ffffff');//changes the color
            this.parentNode.removeChild(this);//deletes the entity

            //console.log(scene);

            Enemy1Loop();
            EnemyMovement();
                      
        });

        function Enemy1Loop(){

            setInterval(function(){
                EnemyCount += 1;
                //console.log(EnemyCount);

                let clone = Object.assign({}, TestEnemy);
                clone.id = EnemyCount;
                clone.x = Math.floor((Math.random() * -10) + 5);
                clone.z = Math.floor((Math.random() * -10) + 5);
                clone.color = "orange";

                //console.log(clone);
                
                //TestEnemy.id = EnemyCount;
                Enemy1Group.push(clone); //pushes the object into the enemy array

                //this will setup the new enemy
                let testObject = document.createElement('a-entity');

                testObject.setAttribute("class", "G1Enemy");
                testObject.setAttribute("id", "Enemy-" + clone.id);
                testObject.setAttribute('mixin', 'cube');
                testObject.setAttribute('position', clone.x + " " + clone.y + " " + clone.z);
                testObject.setAttribute('material', 'color:' + clone.color);
                
                scene.appendChild(testObject); // this will draw the new enemy to the room

                console.log(Enemy1Group);

                //Enemy1Group[clone.id].events();

                //this eventListener will be dynamically created to target each object in the array
                document.querySelector('#Enemy-' + clone.id).addEventListener('click', function () { //mouseenter click
                    //this.setAttribute('material', 'color', 'blue');

                    let currentId: number = this.id.split('-')[1]; //grabs the id of the element and splits the id of the
                                                                  //object in the array to be spliced
                    console.log(currentId);

                    RemoveEnemy(currentId);
                    
                });

                //console.log(document.querySelector('#Enemy-' + clone.id));
                //console.log(document.querySelector('.G1Enemy'));               

            },4000);

        }

        //this is the main loop to make everything move and stuff

        function EnemyMovement(){

            setInterval(function(){


                for(var i = 0; i < Enemy1Group.length; i++){

                    let element = document.getElementsByClassName("G1Enemy")[i]; //grabs ALL the elements
                        
                    //this will make direct the enemy move in the direction of the player
                    if(Enemy1Group[i].x < playerX){
                                        
                        Enemy1Group[i].x += 0.005; //0.02 is a good slow speed
                        element.setAttribute('position', Enemy1Group[i].x + " " + Enemy1Group[i].y + " " + Enemy1Group[i].z); //update the attributes with
                                                                                                                            //the new positions
                    }
                    if(Enemy1Group[i].x > playerX){
                                        
                        Enemy1Group[i].x -= 0.005;
                        element.setAttribute('position', Enemy1Group[i].x + " " + Enemy1Group[i].y + " " + Enemy1Group[i].z); 
                                        
                    }
                    if(Enemy1Group[i].z < playerZ){
                                        
                        Enemy1Group[i].z += 0.005;
                        element.setAttribute('position', Enemy1Group[i].x + " " + Enemy1Group[i].y + " " + Enemy1Group[i].z);
                                        
                    }
                    if(Enemy1Group[i].z > playerZ){
                                        
                        Enemy1Group[i].z -= 0.005;
                        element.setAttribute('position', Enemy1Group[i].x + " " + Enemy1Group[i].y + " " + Enemy1Group[i].z);
                    
                    }
                }

            },30);
        }

        //this function will find the id with the object, splice it out and then remove the image
        function RemoveEnemy(thisId){

            for(let i = 0; i < Enemy1Group.length; i++){

                if(Enemy1Group[i].id == thisId){

                    Enemy1Group.splice(i, 1);
                }
            }
            
            let thisEnemy = document.querySelector('#Enemy-' + thisId);

            console.log(thisEnemy);

            thisEnemy.parentNode.removeChild(thisEnemy);
            
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

    over(){
        alert("Worked!");
    }
}