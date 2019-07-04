import { Component, OnInit, Input, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit {

  @Input() modalTemplate:TemplateRef<{}>
  constructor() { }

  ngOnInit() {
   
  }

}
