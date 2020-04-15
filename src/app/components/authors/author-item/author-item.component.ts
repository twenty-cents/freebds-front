import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { AuthorsService } from '../../../services/bds/authors.service';
import { SeriesService } from '../../../services/bds/series.service';
import { Author } from '../../../models/bds/authors/author';
import { AuthorRoleBySerie } from '../../../models/bds/authors/author-role-by-serie';
import { Serie } from '../../../models/bds/series/serie';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {

  author: Author;
  titleName: String = '';

  authorRoleBySerie: AuthorRoleBySerie[] = [];

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private seriesService: SeriesService
  ) {
    this.author = {
      id: 0,
      externalId: '',
      lastname: '',
      firstname: '',
      nickname: '',
      nationality: '',
      birthdate: '',
      deceaseDate: '',
      biography: '',
      siteUrl: '',
      photoUrl: ''
    }
   }

  ngOnInit() {
    // Get the author id from the activated route
    this.route.paramMap.subscribe(params => {
      // Load the author
      this.authorsService.getAuthorById(+params.get('author.id')).subscribe(author => {
        this.author = author;

        // Set the author title name
        this.titleName = '';
        if (author.lastname != '') {
          this.titleName = author.lastname;
          if (author.firstname != '') {
            this.titleName += ', ';
          }
        }
    
        if (author.firstname != '') {
          this.titleName += author.firstname;
        }
    
        if (this.titleName == '') {
          this.titleName = author.nickname;
        } else {
          if(author.nickname != ''){
            this.titleName += " (" + author.nickname + ")";
          }
        }
      });

      // Load the series
      this.seriesService.getAuthorRolesBySeries(+params.get('author.id')).subscribe(authorRoleBySeries => {
        this.authorRoleBySerie = authorRoleBySeries;
      });

    });
  }

}
