import { DragHandleComponent } from './../resize/drag-handle/drag-handle.component';
import { GjModalService } from './gj-modal.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GjModalComponent } from './gj-modal.component';
import { OverlayModule} from '@angular/cdk/overlay';
import { ResizeComponent } from '../resize/resize.component';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UploadProgressComponent } from './upload-progress/upload-progress.component'
import {MatTabsModule} from '@angular/material/tabs'

@NgModule({
  declarations: [GjModalComponent,ResizeComponent,DragHandleComponent, UploadProgressComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  exports: [GjModalComponent,ResizeComponent,DragHandleComponent],
  entryComponents:[GjModalComponent],
  providers:[GjModalService],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GjModalModule { }
