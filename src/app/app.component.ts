import { UploadService } from './common-module/upload/upload.service';
import { GjModalService } from './common-module/gj-modal/gj-modal.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BrowserStack } from 'protractor/built/driverProviders';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng8test';
  applist=[
    {
      value:'a'
    },
    {
      value:'b'
    },
    {
      value:'c'
    }
  ]
  shouldRender:boolean = true

  winVisible:boolean = false

  constructor(
    private route:Router,
    private uploadModal:GjModalService,
    private up:UploadService
  ){
    
  }
  ngOnInit(): void {
    
    this.route.events
    .subscribe(
      res=>{
        if(res instanceof NavigationEnd){
  
          if(res.url=='/2'){
            this.shouldRender = false
          }else{
            this.shouldRender = true
          }
        }
      }
    )
  }

  gjoktest(data){
    console.log(data)
  }
  
 

}

