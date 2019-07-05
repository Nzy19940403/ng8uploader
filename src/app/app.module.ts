import { HttpClientModule } from '@angular/common/http';
import { AppserviceService, Route1Permission } from './appservice/appservice.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route1Component } from './pageModule/route1/route1.component';
import { Route2Component } from './pageModule/route2/route2.component';
import { route2permission, Route2authService } from './pageModule/route2/route2auth.service';
import { CommonModuleModule } from './common-module/common-module.module';
import { ChatModule } from './common-module/chat/chat.module';
import {ChartsModule} from 'ng2-charts';
import { GjModalModule } from './common-module/gj-modal/gj-modal.module'
import { ResizeComponent } from './common-module/resize/resize.component';
import { Route3Component } from './pageModule/route3/route3.component';


@NgModule({
  declarations: [
    AppComponent,
    Route1Component,
    Route2Component,
    Route3Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModuleModule,
    // ChatModule,
    ChartsModule,
    

  ],
  providers: [
    AppserviceService,
    Route1Permission,
    route2permission,
    Route2authService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
