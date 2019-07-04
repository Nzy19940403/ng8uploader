import { GjModalComponent } from './gj-modal.component';
import { Observable } from 'rxjs';

export abstract class GjModalRef<T = any , R = any> {
    abstract afterOpen:Observable<void>;
    abstract afterClose:Observable<R>;

    abstract open():void;
    abstract close();

    abstract getElement():HTMLElement;
    abstract getInstance():GjModalComponent
}