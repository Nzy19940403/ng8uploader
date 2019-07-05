import { UploadService } from './../upload/upload.service';
import { element } from 'protractor';
import { WiredButton } from 'wired-elements';
import { ModalOptions, OnclickCallback } from './gjModal.type';
import { Component, OnInit, Output, Input, EventEmitter, ComponentRef, ElementRef, ViewChild, Inject, TemplateRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { InputBoolean } from '../mycore/transType';
import { twBind } from '../mycore/twBind';
import {coerceBooleanProperty} from '@angular/cdk/coercion'
import { OverlayRef, Overlay, OverlayKeyboardDispatcher, BlockScrollStrategy } from '@angular/cdk/overlay';
import { GjModalRef } from './gj-modal-ref.class';
import { Observable } from 'rxjs';
import { isPromise } from '../mycore/is-promise';
import { DOCUMENT } from '@angular/common';
import * as _ from 'lodash'
import { changeBakcground } from '../animate/myanimation';



type AnimationState = 'enter' | 'leave' | null;
export const MODAL_ANIMATE_DURATION = 200; // Duration when perform animations (ms)

@Component({
  selector: 'app-gj-modal',
  templateUrl: './gj-modal.component.html',
  styleUrls: ['./gj-modal.component.css'],
  animations:[
    changeBakcground
  ]
})
export class GjModalComponent<T = any,R = any> extends GjModalRef
implements OnInit,AfterViewInit ,OnDestroy,ModalOptions{
 

  @Input() @Output() readonly gjOnOk:EventEmitter<T> | OnclickCallback<T> = new EventEmitter<T>()
  @Input() @Output() readonly gjOnCancel:EventEmitter<T> | OnclickCallback<T> = new EventEmitter<T>()
  @Input() @Output() readonly doAfterSingleTaskUploaded :EventEmitter<T> | OnclickCallback<T> = new EventEmitter<T>() 


  @Input() @InputBoolean() gjVisible:boolean = false
  @Input() @InputBoolean() gjNoAnimation = false;
  @Input() gjZIndex: number = 1000;
  @Input() useDragHandler:boolean = true
  @Input() gjTitle:string|TemplateRef<{}> = '上传'
  @Input() showMask:boolean = true
  @Input() uploaderInfo:any
  @Input() autoUpload:boolean = true
  @Input() minModalHeight:number = 400
  @Input() minModalWidth:number = 600
  // @Output() gjVisibleChange = new EventEmitter()
  // @Input() @twBind('gjVisibleChange',coerceBooleanProperty) gjVisible:boolean = false

  @Output() readonly gjAfterClose = new EventEmitter<R>()
  @Output() readonly gjAfterOpen = new EventEmitter<void>()

  @Output() readonly gjVisibleChange = new EventEmitter<boolean>()
  @ViewChild('pickerControl',{static:true}) pickerControl
  @ViewChild('modalContainer',{static:true}) modalContainer:ElementRef
  @ViewChild('dropzone',{static:true}) dropzone
  @ViewChild('tabGroup',{static:false}) tabGroup


  private contentComponentRef:ComponentRef<T>

  private scrollStrategy:BlockScrollStrategy
  private overlayRef:OverlayRef
  private container:HTMLElement | OverlayRef
  private animationState: AnimationState; 
  private previouslyFocusedElement:HTMLElement;


  maskAnimationState:string = 'leave'


  maskAnimationClassMap:object | null
  modalAnimationClassMap:object | null


  progressListObservable$:any
  showProgressAfterInit =false  // 如果一开始就展现 会有异步问题 值来不及初始化
  progressList:any[] = []
  finishedList:any[] = []

  constructor(
    private elementRef:ElementRef,
    private overlay:Overlay,
    private overlayKeyboardDispatcher:OverlayKeyboardDispatcher,
    @Inject(DOCUMENT) private document:any,
    private renderer:Renderer2,
    private uploader:UploadService
  ) { 
    super()
    this.scrollStrategy = this.overlay.scrollStrategies.block()
  }
  

  get afterClose():Observable<R>{
    return this.gjAfterClose.asObservable()
  }
  get afterOpen():Observable<void>{
    return this.gjAfterOpen.asObservable()
  }
  ngOnInit() {
    this.initProgressListObservable()
    this.initDropzone()
    this.uploader.autoUpload = this.autoUpload
   

  }

  ngAfterViewInit(){
    
  }
  ngOnDestroy(){
    this.destroyDropzone()
    this.destroyProgressListObservable()
  }



  getInstance():GjModalComponent{
    return this
  }
  getElement():HTMLElement{
    return this.elementRef && this.elementRef.nativeElement
  }
  onClickOkCancel(type:'ok'|'cancel'){

    const trigger = {ok:this.gjOnOk,cancel:this.gjOnCancel}[type]

    if(trigger instanceof EventEmitter){
      
      trigger.emit(this.getContentComponent())
    }else if(typeof trigger === 'function'){

      const result = trigger(this.getContentComponent())
      const caseClose = (doClose:boolean |void |{}) => doClose !== false && this.close(doClose as R)
      if(isPromise(result)){
        const handleThen = (doClose:boolean | void | {}) => {
          caseClose(doClose)
        }
        (result as Promise<void>).then(handleThen).catch(handleThen)
      }else{
    
        caseClose(result)
      }
    }



  }
  getContentComponentRef():ComponentRef<T>{
    return this.contentComponentRef
  }
  getContentComponent():T{
    
    return this.contentComponentRef && this.contentComponentRef.instance
  }

  setOverlayRef(overlayRef:OverlayRef){
    this.overlayRef = overlayRef
   
    // this.renderer.setStyle(this.elementRef.nativeElement,'width', this.minModalWidth + 'px')
    // this.renderer.setStyle(this.elementRef.nativeElement,'height', this.minModalHeight + 'px')

   
  }
  setPosition(){   
    //设置位置 居中显示 
   
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'absolute')
    this.renderer.setStyle(this.elementRef.nativeElement,'left', (this.document.children[0].clientWidth - this.minModalWidth)/2 + 'px')
    this.renderer.setStyle(this.elementRef.nativeElement,'top', (this.document.children[0].clientHeight - this.minModalHeight)/2 + 'px')
  }
  open():void{
    // this.gjVisible = true
    
    this.setPosition()
    this.changeVisibleFromInside(true)
  }
  close(result?:R):void{
    // this.gjVisible = false
    this.changeVisibleFromInside(false,result)
  }
  changeVisibleFromInside(visible:boolean,closeResult?:R):Promise<void>{
  
    if(this.gjVisible !== visible){
      this.gjVisible = visible
      this.gjVisibleChange.emit(visible)
      return this.handleVisibleStateChange(visible,true,closeResult)
    }
    return Promise.resolve()
  }

  handleVisibleStateChange(visible:boolean,animation:boolean = true,closeResult?:R):Promise<void>{
    if(visible){
      this.scrollStrategy.enable()
      
      if(this.container instanceof OverlayRef){
        this.overlayKeyboardDispatcher.add(this.overlayRef)
      }
    }else{
      if(this.container instanceof OverlayRef){
        this.overlayKeyboardDispatcher.remove(this.overlayRef)
      }
    }
   
    return Promise.resolve(animation?this.animateTo(visible):undefined).then(()=>{
      if(visible){
        this.gjAfterOpen.emit()
      }else{
        this.gjAfterClose.emit(closeResult)
        this.scrollStrategy.disable()

      }
    })
     

  }
  animateTo(isVisible:boolean):Promise<void>{
    if(isVisible){
      setTimeout(()=>this.updateTransformOrigin())
    }

    this.changeAnimationState(isVisible?'enter':'leave');
    return new Promise(resolve=>
        setTimeout(
          ()=>{
            this.changeAnimationState(null)
            resolve()
          },
          this.gjNoAnimation ? 0 :MODAL_ANIMATE_DURATION
        )
      )
  }
  updateTransformOrigin(){
    const modalElement = this.modalContainer.nativeElement as HTMLElement
    
  }
  changeAnimationState(state:AnimationState):void{
    this.animationState = state

    if(state){
      this.maskAnimationClassMap = {
        [`fade-${state}`]:true,
        [`fade-${state}-active`]:true
      };
      this.modalAnimationClassMap = {
        [`zoom-${state}`]:true,
        [`zoom-${state}-active`]:true
      }
      this.maskAnimationState = state
    }else{
      this.maskAnimationClassMap = this.modalAnimationClassMap = null
    }
  }

  emitAfterResize(data){
    let t = this.tabGroup._elementRef.nativeElement.children[0].children[1].children[0].children[1]
 
    this.renderer.setStyle(t,'left', t.offsetLeft+data/2 + 'px')
   
  }



  //上传功能
  initProgressListObservable(){
    this.showProgressAfterInit = true

    for(let i=0;i<this.uploader.progressList.length;i++){
      this.progressList.push(this.uploader.progressList[i])
    }

    let t  = this.uploader.getObservableOfProgresslist()
    this.progressListObservable$= t.subscribe(
      res=>{
        this.progressList.push(res)
       
      }
    )
  }
  destroyProgressListObservable(){
    this.progressListObservable$.unsubscribe()
  }
  getpickedFileByClick(){
    let t = this.pickerControl.nativeElement.files
    
    this.initOwnProgress(t)

  }
  doupload(){
    this.uploader.startUpload()
  }
  initOwnProgress(t){
  

    for(let i=0;i<t.length;i++){
      t[i].uid = this.uploader.makehash({
        name:t[i].name,
        size:t[i].size
      })
      t[i]['positioninfo']=this.uploaderInfo
    }

    this.uploader.addProgressList(t)

    this.uploader.addUploadTask(t)
  }
  handleSingleTaskFinish(data){
    //通知upload删除自己的progresstask，同时也删除自身的progresstask
    
    if(data.isfinished){
      this.uploader.deleteTask(data)
      this.postAfterUploader(data)
      this.addIntoFinishedList(data)
       _.remove(this.progressList,{uid:data.uid})
    }
  }
  postAfterUploader(data){
    if(this.doAfterSingleTaskUploaded instanceof EventEmitter){
    
      this.uploader.postAfterUploader(data)
      .subscribe(
        res=>{
          console.log(res)
        }
      )
      this.doAfterSingleTaskUploaded.emit(data)
    }else if(typeof this.doAfterSingleTaskUploaded === 'function'){
     
      this.doAfterSingleTaskUploaded(data)
    }else{
      this.uploader.postAfterUploader(data)
      .subscribe(
        res=>{
          console.log(res)
        }
      )
    }
      
  }
  triggerUploadByClick(){
    this.pickerControl.nativeElement.click()
  }
  handleDrop(e){
    let t = e.dataTransfer.files
    //拖拽上传
   
    
    this.initOwnProgress(t)
  }
  initDropzone(){

    // this.uploader.uploader.assignDrop(this.dropzone.nativeElement) 

    this.dropzone.nativeElement.addEventListener('dragover',preventDefaultEvent,false)
    this.dropzone.nativeElement.addEventListener('drop',preventDefaultEvent,false)
  }
  destroyDropzone(){
    this.dropzone.nativeElement.removeEventListener('dragover',preventDefaultEvent,false)
    this.dropzone.nativeElement.removeEventListener('drop',preventDefaultEvent,false)
  }
  handleTriggerFromProgress(data){
    
    if(data.pause){
      this.uploader.makeTaskPause(data.uid)
    }else{
      this.uploader.makeTaskResume(data.uid)
    }

  }
  handleCancelFromProgress(uid){
    this.uploader.deleteTaskAfterCancel(uid)
    _.remove(this.progressList,{uid:uid})
  }
  addIntoFinishedList(data){
    let t = _.cloneDeep(data)
    this.finishedList.push(t)
  }
 
}



//////////////////////////////
function preventDefaultEvent(e){
  e.preventDefault()
}