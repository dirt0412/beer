import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PagerService } from './../app/common/pagination/pagination';//pagination
//import { Ng2TrackScrollModule } from 'ng2-track-scroll'; 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,  HttpModule, NgbModule.forRoot() 
  ],
  providers: [PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
