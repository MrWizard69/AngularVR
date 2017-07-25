
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Home Page';

    ngOnInit(): void {
        
        console.log("You are on the home page");
    }
}