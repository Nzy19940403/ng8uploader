import { ModalOptionsForService  , ModalOptions } from './gjModal.type';
import { GjModalComponent } from './gj-modal.component';
import { Injectable, ComponentRef } from '@angular/core';
import {OverlayRef, Overlay, OverlayConfig} from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal';
import { GjModalRef } from './gj-modal-ref.class';
export class ModalBuilderForService{
  private modalRef:ComponentRef<GjModalComponent> | null;
  private overlayRef:OverlayRef

  constructor(
    private overlay:Overlay,
    options:ModalOptionsForService={}
  ) { 
    this.createModal()

    this.changeProps(options)
    this.modalRef!.instance.setOverlayRef(this.overlayRef)
    
    this.modalRef!.instance.open()
    
    this.modalRef!.instance.gjAfterClose.subscribe(()=>this.destroyModal())
  }
  changeProps(options:ModalOptions):void{
    if(this.modalRef){
      Object.assign(this.modalRef.instance,options)
    }
     
  }
  createModal(){
    this.overlayRef = this.overlay.create()
    
    this.modalRef = this.overlayRef.attach(new ComponentPortal(GjModalComponent))
  }
  getOverlayConfig():OverlayConfig{
    return new OverlayConfig({
      positionStrategy:this.overlay.position().global().centerHorizontally().centerVertically()
    })
  }
  getInstance():GjModalComponent|null{
    return this.modalRef && this.modalRef.instance
  }
  destroyModal():void{
    if(this,this.modalRef){
      this.overlayRef.dispose()
      this.modalRef = null
    }
  }
}

@Injectable()
export class GjModalService {

  constructor(
    private overlay:Overlay
  ) {}
  
  create<T>(options:ModalOptionsForService<T>={}):GjModalRef<T>{

    if(typeof options.gjOnCancel !== 'function'){
      options.gjOnCancel = ()=>{} //leave a empty function to close this modal by default
    }

    const modalRef = new ModalBuilderForService(this.overlay,options).getInstance()

    return modalRef
  }

 
}
