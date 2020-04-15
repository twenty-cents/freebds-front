import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    display = false;
    modal = false;

    expanded: number = 0;

    displayDialog: boolean;

    constructor() { }

    ngOnInit() {

    }

    handleToggleSidebarLeft() {
        this.expanded++;
    }
}
