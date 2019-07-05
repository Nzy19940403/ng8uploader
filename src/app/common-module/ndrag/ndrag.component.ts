import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ElementRef, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: '[ndrag]',
  templateUrl: './ndrag.component.html',
  styleUrls: ['./ndrag.component.css']
})
export class NDragComponent implements OnInit {
  ismoving:boolean = false
  oldmovecoor:any={
    x:null,
    y:null
  }
  newmovecoor:any={
    x:null,
    y:null
  }
  ownCoor:any={
    x:0,
    y:0
  }

  constructor(
    private el:ElementRef,
    @Inject(DOCUMENT) private document:any,
    private renderer:Renderer2
  ) { }

  ngOnInit() {
    this.bindMove()
  }
  bindMove(){
    this.el.nativeElement.addEventListener('mousedown', this.movestart.bind(this), false)
  } 
  movestart(e){
    if(e.button!=0) return 
    e.preventDefault()
    // if(this.isresizing)return

    this.ismoving = true
    let moveFunc;

    this.oldmovecoor={
      x:e.pageX,
      y:e.pageY
    }
    
    // let oldt = this.el.nativeElement.offsetTop
    // let oldl = this.el.nativeElement.offsetLeft
    
    // let test = `translate3d(${oldl +this.newmovecoor['x']-this.oldmovecoor['x']}px,${oldt +this.newmovecoor['y']-this.oldmovecoor['y']}px,0) `

    this.document.addEventListener('mousemove', moveFunc = e => {
     
      if(this.ismoving){
        this.newmovecoor={
          x:e.pageX,
          y:e.pageY
        }
        
        
        

        let test = `translate3d(${this.ownCoor['x'] +this.newmovecoor['x']-this.oldmovecoor['x']}px,${this.ownCoor['y'] +this.newmovecoor['y']-this.oldmovecoor['y']}px,0) `
       console.log(this.ownCoor['x'])
  
        // this.renderer.setStyle(this.el.nativeElement,'transform',test)
        this.renderer.setStyle(this.el.nativeElement,'transform',test)
      }
    });

    this.document.addEventListener('mouseup', e => {
     
      if (e.button !== 0) return;
      
      if(this.ismoving){
        this.ismoving = false
        this.ownCoor={
          x:this.ownCoor['x']+this.newmovecoor['x']-this.oldmovecoor['x'],
          y:this.ownCoor['y']+this.newmovecoor['y']-this.oldmovecoor['y']
        }
        this.document.removeEventListener('mousemove', moveFunc);
      }
  
    }, { once: true });
  }
  getTranslateX(){
    this.el.nativeElement
  }

}
