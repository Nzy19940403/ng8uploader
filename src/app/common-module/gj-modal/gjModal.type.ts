import { ModalOptions } from './gjModal.type';
import { EventEmitter, TemplateRef } from '@angular/core';

export type OnclickCallback<T> = (instance:T) => (false|void|{}) | Promise<false|void|{}>

export interface ModalOptions<T = any,R = any>{
    gjVisible?:boolean;
    
    gjAfterOpen?:EventEmitter<void>;
    gjAfterClose?:EventEmitter<R>
    
    gjZIndex?:number;
    useDragHandler?:boolean;
    showMask?:boolean;
    gjTitle?:string|TemplateRef<{}>;
    gjFooter?:string|TemplateRef<{}>|null;
    
    minModalHeight?:number;
    minModalWidth?:number;

    uploaderInfo?:any;
    autoUpload?:boolean;
    doAfterSingleTaskUploaded?:EventEmitter<T> | OnclickCallback<T>;

    //预设的ok和cancel按钮
    gjOkText?:string | null;
    gjOnOk?:EventEmitter<T> | OnclickCallback<T>;
    gjCancelTest?:string | null;
    gjOnCancel?:EventEmitter<T> | OnclickCallback<T>
}

export interface ModalOptionsForService<T = any> extends ModalOptions<T>{
    gjOnOk?:OnclickCallback<T>;
    gjOnCancel?:OnclickCallback<T>;
    doAfterSingleTaskUploaded?:EventEmitter<T> | OnclickCallback<T>;
}

