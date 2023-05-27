import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-demos-list',
  templateUrl: './demos-list.component.html',
  styleUrls: ['./demos-list.component.css'],
  encapsulation: ViewEncapsulation.None
  
})
export class DemosListComponent implements OnInit {

  quicksightDemos = false;
  rekogDemos = false;
  cognitoDemos = false;
  @Output() newItemEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  hideAll() {
    this.quicksightDemos = false;
    this.rekogDemos = false;
    this.cognitoDemos = false;
  }
  showQs() {
    this.hideAll()
    setTimeout(() => {
      this.quicksightDemos = true
    }, 10)
    
  }

  showRekog() {
    this.hideAll();
    setTimeout(() => {
      this.rekogDemos = true
    }, 10)
  }

  showCognito() {
    this.hideAll();
    setTimeout(() => {
      this.cognitoDemos = true
    }, 10)
  }

  call_parent($event: any) {
    this.newItemEvent.emit($event);
  }

}
