import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.css']
})
export class UploadProgressComponent implements OnInit {

  @Input() progressValue:number
  @Input() progressInfo:any
  @Output() emitWhenFinish = new EventEmitter()
  @Output() emitWhenTrigger = new EventEmitter()
  @Output() emitWhenCancel = new EventEmitter()

  showPause:boolean = true
  constructor() { }

  ngOnInit() {
  
  }

  fireFinishInfo(){
    this.emitWhenFinish.emit(this.progressInfo)
  }

  trigger(){
    if(this.showPause){
      //暂停
      let obj ={
        uid:this.progressInfo.uid,
        pause:true
      }
      this.emitWhenTrigger.emit(obj)
    }else{
      //继续
      let obj ={
        uid:this.progressInfo.uid,
        pause:false
      }
      this.emitWhenTrigger.emit(obj)
    }

    this.showPause = !this.showPause
  }
  cancelTask(){
    let uid = this.progressInfo.uid
    this.emitWhenCancel.emit(uid)
  }
}
