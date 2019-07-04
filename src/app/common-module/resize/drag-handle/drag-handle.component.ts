import { element } from 'protractor';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: '[dragHandle]',
  templateUrl: './drag-handle.component.html',
  styleUrls: ['./drag-handle.component.css']
})
export class DragHandleComponent implements OnInit {

  constructor(
    private element:ElementRef
  ) { }

  ngOnInit() {
  }

}
