import { GjModalService } from './../../common-module/gj-modal/gj-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-route3',
  templateUrl: './route3.component.html',
  styleUrls: ['./route3.component.css']
})
export class Route3Component implements OnInit {
  win3visible:boolean = false

  constructor(
    private uploadModal :GjModalService
  ) { }
    @ViewChild('test',{static:true}) test
  ngOnInit() {
    let t = new Promise((reslove,reject)=>{
      
    })
  }
  openwin(){
    this.uploadModal.create({
      uploaderInfo:{
        target:'mail'
      },
     
      gjTitle:this.test
      // doAfterSingleTaskUploaded:(data)=>{
      //   debugger
      //   console.log(data)
      // }
    })

  }
  openwin2(){
    this.uploadModal.create({
      uploaderInfo:{
        target:'plan'
      }
    })
  }
  aaa(){
    console.log(this)
  }
  openwin3(){
    this.win3visible = true
    console.log(3)
  }
}
