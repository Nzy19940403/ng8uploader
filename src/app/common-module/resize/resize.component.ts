import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ElementRef, Input, Renderer2, HostListener, ViewChild, ViewChildren, ContentChild, ContentChildren, Inject, Output, EventEmitter } from '@angular/core';
import { DragHandleComponent } from './drag-handle/drag-handle.component';

export type resizeDirectionType = 'horizontal' | 'vertical' | 'all';
 

@Component({
  selector: '[resize]',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css']
})
export class ResizeComponent implements OnInit {
  @Input() childresize: boolean = false
  @Input() resizeDirection: resizeDirectionType = 'all'
  @Input() sizeinfo: any
  @Input() propName: string = 'length'
  @Input() allowMove:boolean = true //是否允许移动物体
  @Input() allowresize:boolean = true //是否允许resize

  @Input() minWidth:number = 0
  @Input() minHeight:number = 0

  @Output() emitAfterResize = new EventEmitter()

  @ContentChildren(DragHandleComponent) dragHandle

  private dragHandlelist:HTMLElement[]=[]

  handleRender: string[] = []
  isresizing: boolean = false
  currentActiveDirection: string = ''
  oldcoor: object = {
    x: null,
    y: null
  }
  newcoor: object = {
    x: null,
    y: null
  }
  oldwidth: any
  oldheight: any
  oldleft: any
  oldtop: any

  ismoving: boolean = false
  oldmovecoor:object={
    x:null,
    y:null
  }
  newmovecoor:object={
    x:null,
    y:null
  }
  constructor(
    public el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document:any
  ) { }

  ngOnInit() {
    this.initSelf()

  }
  initSelf() {
    this.checkHandleRender()
    if(this.allowMove){
      this.bindMovble()
    }
   

    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute')

  }
  bindMovble() {
    //在此确定draghArea的位置

    setTimeout(()=>{

      if(this.dragHandle._results.length>0){
        this.dragHandle._results.forEach(item => {
          this.dragHandlelist.push(item.element.nativeElement)
          item.element.nativeElement.addEventListener('mousedown', this.movestart.bind(this),false)
        });
      }else{
        this.el.nativeElement.addEventListener('mousedown', this.movestart.bind(this), false)
      }      
    })
  }
  movestart(e) {
    
    if(e.button!=0) return 
    e.preventDefault()
    if(this.isresizing)return

    this.ismoving = true
    let moveFunc;
    this.oldmovecoor={
      x:e.pageX,
      y:e.pageY
    }
    
    let oldt = this.el.nativeElement.offsetTop
    let oldl = this.el.nativeElement.offsetLeft
    
  

    this.document.addEventListener('mousemove', moveFunc = e => {
     
      if(this.ismoving){
        this.newmovecoor={
          x:e.pageX,
          y:e.pageY
        }
        
        this.renderer.setStyle(this.el.nativeElement,'top',oldt +this.newmovecoor['y']-this.oldmovecoor['y']+'px')
        this.renderer.setStyle(this.el.nativeElement,'left',oldl +this.newmovecoor['x']-this.oldmovecoor['x']+'px')
      }
    });

    this.document.addEventListener('mouseup', e => {
     
      if (e.button !== 0) return;
      
      if(this.ismoving){
        this.ismoving = false
     
        this.document.removeEventListener('mousemove', moveFunc);
      }
  
    }, { once: true });
  }


  checkHandleRender() {
    if (this.childresize) return

    if (this.resizeDirection == 'all') {
      this.handleRender = ['top', 'bottom', 'left', 'right','topleft','topright','bottomleft','bottomright']
    } else if (this.resizeDirection == 'horizontal') {
      this.handleRender = ['left', 'right']
    } else if (this.resizeDirection == 'vertical') {
      this.handleRender = ['top', 'bottom']
    }

  }
  renderHandler(data) {
    if(!this.allowresize) return false
    let bool = this.handleRender.some(item => item == data)
    return !!bool
  }

  resizeStart(e, direction) {
    
    if(!this.allowresize) return 
    
    if(e.button==0){
      e.preventDefault()
      this.oldcoor = {
        x: e.pageX,
        y: e.pageY
      }

      this.currentActiveDirection = direction
      this.isresizing = true
      this.oldwidth = this.el.nativeElement.clientWidth
      this.oldheight = this.el.nativeElement.clientHeight
      this.oldleft = this.el.nativeElement.offsetLeft
      this.oldtop = this.el.nativeElement.offsetTop
    }
    

  }
  @HostListener('document:mousemove', ['$event'])
  resizeing(e) {
    if (this.isresizing) {
      e.preventDefault()

      if (this.isresizing) {
        this.newcoor = {
          x: e.pageX,
          y: e.pageY
        }
        let xval = this.newcoor['x'] - this.oldcoor['x']
        let yval = this.newcoor['y'] - this.oldcoor['y']

        this.renderWithMove(xval, yval)

      }
    }

  }

  @HostListener('document:mouseup', ['$event'])
  resizeEnd(e) {
    e.preventDefault()
    if(this.isresizing){
      this.isresizing = false
      this.currentActiveDirection = ''
     
      this.emitAfterResize.emit(this.el.nativeElement.clientWidth-this.oldwidth)
    }
    
  }

  renderWithMove(xval, yval) {
    if (this.currentActiveDirection == 'right') {
    
      this.renderer.setStyle(this.el.nativeElement, 'width', this.oldwidth + xval + 'px')
    } else if (this.currentActiveDirection == 'left') {
     
      if (this.oldleft + xval < this.oldleft + this.oldwidth - this.minWidth) {
        this.renderer.setStyle(this.el.nativeElement, 'width', this.oldwidth - xval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'left', this.oldleft + xval + 'px')
      }
    } else if (this.currentActiveDirection == "top") {
     
      if (this.oldtop + yval < this.oldheight + this.oldtop - this.minHeight) {
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldheight - yval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'top', this.oldtop + yval + 'px')

      }

    } else if (this.currentActiveDirection == 'bottom') {
     
      // if(this.oldtop + yval < this.oldheight + this.oldtop - this.minHeight){
        
      // }
      // console.log(this.oldtop + yval )
      // console.log(this.oldheight + this.oldtop - this.minHeight)
      this.renderer.setStyle(this.el.nativeElement, 'height', this.oldheight + yval + 'px')
    }else if(this.currentActiveDirection == 'topright'){
      //右上角
      if (this.oldtop + yval < this.oldheight + this.oldtop - this.minHeight) {
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldheight - yval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'top', this.oldtop + yval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'width', this.oldwidth + xval + 'px')
      }
      
    }else if(this.currentActiveDirection == 'topleft'){
      //左上角
      if (this.oldtop + yval < this.oldheight + this.oldtop - this.minHeight && this.oldleft + xval < this.oldleft + this.oldwidth - this.minWidth) {
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldheight - yval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'top', this.oldtop + yval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'width', this.oldwidth - xval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'left', this.oldleft + xval + 'px')
      }
    }else if(this.currentActiveDirection == 'bottomleft'){
      //左下角
      if (this.oldleft + xval < this.oldleft + this.oldwidth-this.minWidth) {
        this.renderer.setStyle(this.el.nativeElement, 'width', this.oldwidth - xval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'left', this.oldleft + xval + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldheight + yval + 'px')
      }
    }else if(this.currentActiveDirection == 'bottomright'){
      //右下角
      this.renderer.setStyle(this.el.nativeElement, 'width', this.oldwidth + xval + 'px')
      this.renderer.setStyle(this.el.nativeElement, 'height', this.oldheight + yval + 'px')
    }


  }

}
