import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import { delay } from 'rxjs/operators';

import { ResizeService } from '../../../services/commons/resize.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.css']
})
export class SidebarLeftComponent implements OnInit {

  @Input() toggle: number;

  display = true;
  modal = false;

  opened = true;
  sticky = true;

  screenSize;

  items: MenuItem[];

  constructor(private resizeSvc: ResizeService) { 
    this.resizeSvc.onResize$
    .pipe(delay(0))
    .subscribe(x => {
      //this.screenSize = x;
      console.log("resize = " + x);
      this.screenSize = x;

      this.refresh();
    });

  }

  ngOnInit(): void {
    // Init Menu
    this.items = [
      {
          label: 'Tableau de bord',
          icon: 'pi pi-pw pi-file',
          routerLink: ['dashboard']
      },
      {
          label: 'Encyclopédie Bds',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {label: 'Navigation libre', icon: 'pi pi-fw pi-refresh', routerLink: ['referential/navigate']},
            {label: 'Recherche', icon: 'pi pi-fw pi-trash', routerLink: ['referential/free-search']}
          ]
      },
      {
          label: 'Ma collection',
          icon: 'pi pi-fw pi-question',
          items: [
            {label: 'Navigation libre', icon: 'pi pi-fw pi-refresh', routerLink: ['collection/navigate']},
            {label: 'Recherche', icon: 'pi pi-fw pi-trash', routerLink: ['collection/free-search']}
          ]
      },
      {
          label: 'Administration',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Gestion des profils',
                  icon: 'pi pi-fw pi-pencil'
              },
              {
                  label: 'Gestion des collections',
                  icon: 'pi pi-fw pi-tags'
              }
          ]
      }
  ];

  }
  
  refresh() {
    if(this.display) {
      if(this.screenSize == 0 || this.screenSize == 1 || this.screenSize == 2) {
        this.modal = false;
        this.display = false;
      }
    }

    if(this.screenSize == 4 || this.screenSize == 3) {
      this.modal = false;
      this.display = true;
    }

  }

  show() {
    this.opened = true;
  }

  hide() {
    this.opened = false;
  }


    /**
   * Get pager changes from tge parent component
   * 
   * @param change
   */
  ngOnChanges(change: SimpleChange) {
    this.refresh();
    console.log(change);
    const status:boolean = change['toggle'].firstChange;
    console.log(status);
    if(status == false) {
      if(this.screenSize == 0 || this.screenSize == 1 || this.screenSize == 2) {
        this.modal = true;
        this.display = true;
      }
    }
  }

}
