import { GjModalComponent } from './gj-modal/gj-modal.component';
import { ChatModalComponent } from './chat/chat-modal/chat-modal.component';
import { ChatModule } from './chat/chat.module';
import { ResizeComponent } from './resize/resize.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GjModalModule } from './gj-modal/gj-modal.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatModule,
    GjModalModule
  ],
  exports:[
    ResizeComponent,
    ChatModalComponent,
    GjModalComponent
  ]
})
export class CommonModuleModule { }
