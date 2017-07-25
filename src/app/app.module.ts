import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { HomeComponent }         from './home.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
