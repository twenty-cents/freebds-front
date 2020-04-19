import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { TokenStorageService } from '../../../services/security/token-storage.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() sidebarLeftToggled = new EventEmitter();

  isLoggedIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
    }
  }

  handleToggleSidebarLeft($event){
    this.sidebarLeftToggled.emit();
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
