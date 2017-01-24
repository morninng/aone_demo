import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdAreaComponent } from './ad-area/ad-area.component';

import {AoneMgrService} from './service/aone-mgr.service';
import { TopPageComponent } from './top-page/top-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AdAreaComponent,
    TopPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    JsonpModule
  ],
  providers: [AoneMgrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
