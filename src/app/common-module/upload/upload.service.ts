import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Uploader from 'simple-uploader.js'
import * as HashMaker from 'object-hash'
import * as _ from 'lodash'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploader:any
  progressList:any[] = []
  progressListObservable$ = new Subject()
  autoUpload:boolean = false


  constructor(
    private http:HttpClient
  ) { 

    console.log('upload init')
    this.initUploader()
  }
  initUploader(){
    this.uploader = new Uploader({
      target:'http://192.168.50.180:8005/fomssapi/Command/uploadfile/',
      allowDuplicateUploads :true,
      maxChunkRetries:3, // 失败最大重试上传次数
      forceChunkSize:true ,// 强制所有分块的值不超过chunksize的值
      simultaneousUploads:3,
      headers:{},
      testChunks:false
    })
    
    this.changeHashIdOnFileAdded()
    this.updateProgress()
  }
  getObservableOfProgresslist(){
    return this.progressListObservable$.asObservable()
  }

  addUploadTask(t){

    for(let i=0;i<t.length;i++){
      this.uploader.addFile(t[i])
    
    }
    
    if(this.autoUpload){
      this.uploader.upload()
    }
  }

  startUpload(){
    console.log(this.uploader)
    this.uploader.upload()
  }
  changeHashIdOnFileAdded(){
    this.uploader.on('fileAdded',(file)=>{

      let obj = {
        name:file.name,
        size:file.size
      }
      file.uniqueIdentifier= this.makehash(obj)
    },false)
  }
  makehash(data){
    return HashMaker(data)
  }

  addProgressList(data){
    for(let i=0;i<data.length;i++){
      let obj={
        name:data[i].name,
        progress:0,
        currentSpeed:0,
        uid:data[i].uid,
        isfinished:false,
        positioninfo:data[i].positioninfo,
        totalchunk:0,
        type:data[i].type
      }
      this.progressList.push(obj)
      this.progressListObservable$.next(obj)

    }

  }
  updateProgress(){
    this.uploader.on('fileProgress',(rootFile,file,chunk)=>{
      let t = _.find(this.progressList,{uid:file.uniqueIdentifier})
   
      t.progress = (100*file._prevUploadedSize/file.size).toFixed(2) //当前进度
      t.currentSpeed =(file.currentSpeed/(1024*1024)).toFixed(2) //当前速度
      t.totalchunk=file.chunks.length
      if(t.progress>=100){
        t.isfinished=true
      }
    })
  }
  
  postAfterUploader(data){
    let obj ={
      hashid:data.uid,
      info:data.positioninfo,
      totalchunk:data.totalchunk,
      name:data.name,
      type:data.type
    }
    return this.http.post('http://192.168.50.180:8005/fomssapi/Command/postfile/',obj)
  }
  makeTaskPause(uid){

    let file = this.uploader.getFromUniqueIdentifier(uid)

    file.pause()
  }
  makeTaskResume(uid){
    let file = this.uploader.getFromUniqueIdentifier(uid)

    file.resume()
  }
  deleteTaskAfterCancel(uid){
    let file = this.uploader.getFromUniqueIdentifier(uid)

    file.cancel()
    _.remove(this.progressList,{uid:uid})
  }
  deleteTask(data){
    //上传完毕之后自己把进度条删了
    _.remove(this.progressList,{uid:data.uid})
    console.log(this.progressList)
  }
}
