
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

    //currentTarget: number = 0;
    //currentIdString: string = "";
    //triggered: boolean = false;

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

        let triggered: boolean = false;
        let currentIdString: string = "";
        let currentTarget: number = 0;
        let triggerHold: boolean = false;
        let isMoving: boolean = false;

        let Enemy1Group = [];
        let EnemyCount: number = -1;

        console.log(cursor);    

        let cursorX: number = 0;
        let cursorY: number = 0;
        let cursorZ: number = -3;

        let playerX: number = 0;
        let playerY: number = 1.6; //1.3
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
        //let maxDepth: number = -5;
        //let direction: string = "forward";

        // setInterval(function(){

        //     if(direction == "forward"){

        //         cursorZ--;
        //         //cursorY = -1;
        //         cursor.setAttribute('position', + cursorX + ' ' + cursorY + ' ' + cursorZ);

        //         if(cursorZ < maxDepth){

        //             direction = "backward";
        //         }
        //     }
        //     if(direction == "backward"){

        //         cursorZ++;
        //         //cursorY = -1;
        //         cursor.setAttribute('position', + cursorX + ' ' + cursorY + ' ' + cursorZ);

        //         if(cursorZ > -1.5){ // was -2

        //             direction = "forward";
        //         }
        //     }

        // },30);
   
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


        //This makes the game start
        document.querySelector('#start-1').addEventListener('mouseenter', function () { //mouseenter
            this.setAttribute('material', 'color', 'blue');

            currentIdString = this.id;

            if(triggered == true && triggerHold == false){

                let thisThing = document.querySelector('#start-1');
                thisThing.parentNode.removeChild(thisThing);
                Enemy1Loop();
                EnemyMovement();

            }
        });
        
        document.querySelector('#start-1').addEventListener('mouseleave', function () {
            this.setAttribute('material', 'color', 'green');

            currentIdString = "";
            
        });

        function Enemy1Loop(){

            setInterval(function(){
                EnemyCount += 1;
                //console.log(EnemyCount);

                let clone = Object.assign({}, TestEnemy);
                clone.id = EnemyCount;
                clone.x = Math.floor((Math.random() * -10) + 5);
                clone.z = Math.floor((Math.random() * -10) + 5);
                clone.y = 1.7
                clone.color = "orange";

                if(clone.x > -1 && clone.x < 2){

                    clone.x = 4;
                }
                if(clone.z > -1 && clone.z < 2){

                    clone.z = -4;
                }
                
                Enemy1Group.push(clone); //pushes the object into the enemy array

                //this will setup the new enemy
                let testObject = document.createElement('a-entity');

                testObject.setAttribute("class", "G1Enemy");
                testObject.setAttribute("id", "Enemy-" + clone.id);
                testObject.setAttribute('mixin', 'cube');
                testObject.setAttribute('position', clone.x + " " + clone.y + " " + clone.z);
                testObject.setAttribute('material', 'color:' + clone.color);
                testObject.setAttribute('geometry', 'primitive:box');
                testObject.setAttribute('geometry', 'height:1');
                testObject.setAttribute('geometry', 'width:1');
                testObject.setAttribute('geometry', 'depth:1');
                
                scene.appendChild(testObject); // this will draw the new enemy to the room

                console.log(Enemy1Group);

                //this eventListener will be dynamically created to target each newly created object in the array
                document.querySelector('#Enemy-' + clone.id).addEventListener('mouseenter', function () { //mouseenter
                    this.setAttribute('material', 'color', 'blue');
                    let EnemyId = this.id.split('-');
                    currentTarget = EnemyId[1];
                    currentIdString = this.id;
        
                    if(triggered == true && triggerHold == false){
        
                        RemoveEnemy(currentTarget);
        
                    }

                });
                
                document.querySelector('#Enemy-' + clone.id).addEventListener('mouseleave', function () {
                    this.setAttribute('material', 'color', 'orange');
                    currentTarget = 0;
        
                    currentIdString = "";
                    
                });            

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

        //this function will find the id with the object, splice it out of the array and then remove the image
        function RemoveEnemy(thisId: number){

            for(let i = 0; i < Enemy1Group.length; i++){

                if(Enemy1Group[i].id == thisId){

                    Enemy1Group.splice(i, 1);
                }
            }
            
            let thisEnemy = document.querySelector('#Enemy-' + thisId);

            console.log(thisEnemy);

            thisEnemy.parentNode.removeChild(thisEnemy);
            
        }
        
        //camera and move direction

        setInterval(function() {

            if(isMoving == true){

                let pos: any = document.querySelector('#player').getAttribute('position');
                let rot: any = document.querySelector('#player').getAttribute('rotation');
                let player: any = document.querySelector('#player');
                //let wand: any = document.querySelector('#Wand');
                //playerY = 1.6;
                //let rotation: number = 0;

                // let thisWand: any = document.querySelector('#Wand');
                // thisWand.parentNode.removeChild(thisWand);
    
                if(rot.y > 359){
    
                    rot.y = 0;
                    player.setAttribute('rotation', rot.x + ' ' + rot.y + ' ' + rot.z);
                    
                }
                if(rot.y < -359){
    
                    rot.y = 0;
                    player.setAttribute('rotation', rot.x + ' ' + rot.y + ' ' + rot.z);
                }
    
                if(rot.y < 16 && rot.y > -1){ // turn head left
    
                    playerZ -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -1 && rot.y > -16){ // turn head right
    
                    playerZ -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 55 && rot.y > 16){ // turn head left
    
                    playerZ -= 0.05;
                    playerX -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -16 && rot.y > -55){ // turn head right
    
                    playerZ -= 0.05;
                    playerX += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 60 && rot.y > 55){ // turn head left
    
                    playerZ -= 0.05;
                    playerX -= 0.03;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -55 && rot.y > -60){ // turn head right
    
                    playerZ -= 0.05;
                    playerX += 0.03;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 100 && rot.y > 60){ // turn head left
    
                    playerX -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -60 && rot.y > -100){ // turn head right
    
                    playerX += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 130 && rot.y > 100){ // turn head left
    
                    playerZ += 0.05;
                    playerX -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -100 && rot.y > -130){ // turn head right
    
                    playerZ += 0.05;
                    playerX += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 155 && rot.y > 130){ // turn head left
    
                    playerZ += 0.05;
                    playerX -= 0.03;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -130 && rot.y > -155){ // turn head right
    
                    playerZ += 0.05;
                    playerX += 0.03;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 190 && rot.y > 155){ // turn head left
    
                    playerZ += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -155 && rot.y > -190){ // turn head rght
    
                    playerZ += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 225 && rot.y > 190){ // turn head left
    
                    playerZ += 0.05;
                    playerX += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -190 && rot.y > -225){ // turn head right
    
                    playerZ += 0.05;
                    playerX -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 275 && rot.y > 225){ // turn head left
    
                    playerX += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -225 && rot.y > -275){ // turn head right
    
                    playerX -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 310 && rot.y > 275){ // turn head left
    
                    playerZ -= 0.05;
                    playerX += 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -275 && rot.y > -310){ // turn head right
    
                    playerZ -= 0.05;
                    playerX -= 0.05;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < 359 && rot.y > 310){ // turn head left
    
                    playerZ -= 0.05;
                    playerX += 0.03;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
                if(rot.y < -310 && rot.y > -359){ // turn head left
    
                    playerZ -= 0.05;
                    playerX -= 0.03;
                    player.setAttribute('position', playerX + ' ' + playerY + ' ' + playerZ);
                }
    
                //console.log(rot.y);
            }

        }, 30);

        
       
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

          let controller = navigator.getGamepads();
          
          if(controller == undefined){

            controller.length = 0;
          }

        //This is an experiment for the GearVR controller

        setInterval(function(){

            //if(controller[i] != null){

                for(var i = 0; i < controller.length; i++){

                    if(controller[i] != null){

                        if(controller[1].buttons[0].pressed == true){

                            isMoving = true;
                        }
                        if(controller[1].buttons[0].pressed == false){

                            isMoving = false;

                            let newWand = document.createElement('a-entity');
                            
                            // newWand.setAttribute("id", "Wand");
                            // newWand.setAttribute('primitive', 'box');
                            // newWand.setAttribute('position', ".1 0 -.7");
                            // newWand.setAttribute('material', 'color: #49311c');
                            // newWand.setAttribute('rotation', "45 0 0");
                            // scene.appendChild(newWand);
                        }
                    
                        //buttons[0] is the D-Pad on GearVR
                        if(controller[1].buttons[1].pressed == true){ //this is the trigger on the GearVR
                            
                            triggered = true
                            var event2 = new CustomEvent("mouseenter");
                            
                            if(currentIdString == "Enemy-" + currentTarget){

                                document.querySelector('#Enemy-' + currentTarget).dispatchEvent(event2);
                            }

                            if(currentIdString == "start-1"){
                                
                                document.querySelector('#start-1').dispatchEvent(event2);
                            }
                            
                            triggerHold = true;

                            //document.querySelector('.cursor').setAttribute('cursor', 'fuse: true');
                            //document.querySelector('.cursor').setAttribute('cursor', 'fuseTimeout:15');
                                
                        }
                        if(controller[1].buttons[1].pressed == false){
                            
                            triggered = false;
                            triggerHold = false;
                            //document.querySelector('.success').setAttribute('color', 'white');
                            //document.querySelector('.cursor').setAttribute('cursor', 'fuse:false');
                            //document.querySelector('.cursor').setAttribute('cursor', 'fuseTimeout:15');
                                
                        }
                    }

            //alert("controller " + i + " is connected; controller map " + controller[i].mapping + "; controller button1 " + controller[i].buttons[0].pressed);
        //}
    }

        },100);

          

        //   alert(controller[0].buttons[0].value);
        //   alert(controller[0].buttons[1].value);
        //   alert(controller[0].buttons[2].value);
        //   alert(controller[0].buttons[3].value);
        
    }

    over(){
        alert("Worked!");
    }
}