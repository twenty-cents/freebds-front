import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() sidebarLeftToggled = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleToggleSidebarLeft($event){
    this.sidebarLeftToggled.emit();
  }
}
