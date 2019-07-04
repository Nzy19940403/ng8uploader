import { GjModalService } from './../../common-module/gj-modal/gj-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route3',
  templateUrl: './route3.component.html',
  styleUrls: ['./route3.component.css']
})
export class Route3Component implements OnInit {

  constructor(
    private uploadModal :GjModalService
  ) { }

  ngOnInit() {
  }
  openwin(){
    this.uploadModal.create({
      uploaderInfo:{
        target:'mail'
      },
    })

  }
  openwin2(){
    this.uploadModal.create({
      uploaderInfo:{
        target:'plan'
      }
    })
  }
}
