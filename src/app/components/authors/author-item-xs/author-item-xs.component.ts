import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Author } from '../../../models/bds/authors/author';

@Component({
  selector: 'app-author-item-xs',
  templateUrl: './author-item-xs.component.html',
  styleUrls: ['./author-item-xs.component.css']
})
export class AuthorItemXsComponent implements OnInit {

  @Input() author: Author;
  @Input() context: string;

  authorPhoto: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Add covers to the lightbox
    this.authorPhoto.push({source: this.author.photoUrl, thumbnail: this.author.photoUrl, title: this.author.lastname + ' ' + this.author.firstname});

  }
}
