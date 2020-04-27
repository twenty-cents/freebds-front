import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../../services/security/token-storage.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isLoggedIn = false;
  username: string;
  avatar: string;

  items: MenuItem[];
  menuProfileItems: MenuItem[];

  display = false;
  modal = false;

  opened = true;
  sticky = true;

  constructor(
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.avatar = user.avatar;
    }

    // Init main menu
    this.items = [
      {
        label: 'Accueil',
        items:[{
          label: 'Tableau de bord',
          icon: 'pi pi-home',
          command: (event) => {this.display = false},
          routerLink: ['dashboard']
      }]
      }, {
          label: 'Encyclopédie Bds',
          items: [
            {label: 'Navigation libre', icon: 'pi pi-cloud', command: (event) => {this.display = false}, routerLink: ['navigate', 'referential']},
            {label: 'Recherche', icon: 'pi pi-search', command: (event) => {this.display = false}, routerLink: ['free-search', 'referential']}
          ]
      }, {
          label: 'Ma collection',
          icon: 'pi pi-fw pi-question',
          items: [
            {label: 'Navigation libre', icon: 'pi pi-images', command: (event) => {this.display = false}, routerLink: ['navigate', 'library']},
            {label: 'Recherche', icon: 'pi pi-search', command: (event) => {this.display = false}, routerLink: ['free-search', 'library']}
          ]
        }, {
          label: 'Administration',
          icon: 'pi pi-fw pi-users',
          items: [
            {label: 'Profil utilisateur', icon: 'pi pi-user-edit', command: (event) => {this.display = false}, routerLink: ['user']},
            {label: 'Sécurité', icon: 'pi pi-key', command: (event) => {this.display = false}, routerLink: ['security']},
            {label: 'Collections', icon: 'pi pi-images', command: (event) => {this.display = false}, routerLink: ['']},
            {label: 'Déconnexion', icon: 'pi pi-key', command: (event) => {this.display = false; this.logout()}}
          ]
      }
    ];

    // Init profile menu
    this.menuProfileItems = [
      {
        items: [{
          label: 'Mon profil',
          icon: 'pi pi-user-edit',
          routerLink: ['user']
        }, {
          label: 'Sécurité',
          icon: 'pi pi-key',
          routerLink: ['security']
        }, {
          separator:true
        }, {
          label: 'Collections',
          icon: 'pi pi-images',
          routerLink: ['dashboard']
        }, {
          separator:true
        }, {
          label: 'Déconnexion',
          icon: 'pi pi-sign-out',
          command: (event) => { this.logout() }
        }]
      }]
  }

  handleToggleSidebarLeft($event){
    if(this.display)
      this.display = false;
    else
      this.display = true;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  show() {
    this.opened = true;
  }

  hide() {
    this.opened = false;
  }


}
