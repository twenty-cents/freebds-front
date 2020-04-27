import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { LibraryContentDialogInput } from '../../../models/library/library-content-dialog-input';
import { LibraryContentDialogOutput } from '../../../models/library/library-content-dialog-output';
import { Serie } from '../../../models/bds/series/serie';
import { GraphicNovel } from '../../../models/bds/graphic-novels/graphic-novel';
import { GraphicNovelItemComponent } from '../../graphic-novels/graphic-novel-item/graphic-novel-item.component';
import { LibraryContentUpdateRequest } from '../../../models/library/request/library-content-update-request';
import { LibraryContentService } from '../../../services/library/library-content.service';

@Component({
  selector: 'app-graphic-novel-item-dialog',
  templateUrl: './graphic-novel-item-dialog.component.html',
  styleUrls: ['./graphic-novel-item-dialog.component.css']
})
export class GraphicNovelItemDialogComponent implements OnInit {

  serie: Serie;
  graphicNovel: GraphicNovel;

  isPaper: boolean = false;
  isNumeric: boolean = false;
  isWishlist: boolean = false;

  constructor(
    private libraryContentService: LibraryContentService,
    public dialogRef: MatDialogRef<GraphicNovelItemComponent>,
    @Inject(MAT_DIALOG_DATA) public libraryContentDialogInput: LibraryContentDialogInput) { }

  ngOnInit(): void {
    // Convenience vars
    this.serie = this.libraryContentDialogInput.serie;
    this.graphicNovel = this.libraryContentDialogInput.graphicNovel;
    // Init updatable values
    this.isPaper = this.graphicNovel.libraryContent.isPhysical;
    this.isNumeric = this.graphicNovel.libraryContent.isNumeric;
    this.isWishlist = this.graphicNovel.libraryContent.isWishlist;
  }

  /**
   * Cancel dialog
   */
  handleCancelClick(): void {
    const libraryContentDialogOutput: LibraryContentDialogOutput = {
      status : "CANCELED",
      libraryContent : undefined 
    }
    this.dialogRef.close(libraryContentDialogOutput);
  }

  /**
   * Validate & close dialog
   */
  handleValideClick(): void {
    // Send the library content update request
    let libraryContentUpdateRequest : LibraryContentUpdateRequest = {
      libraryContentId : this.graphicNovel.libraryContent.id,
      isFavorite : this.graphicNovel.libraryContent.isFavorite, // TODO : Add library content favorite support
      isPhysical : this.isPaper,
      isNumeric : this.isNumeric,
      isWishlist : this.isWishlist
    }

    this.libraryContentService.update(libraryContentUpdateRequest).subscribe(
      // If the response is ok, close the dialog and return the updated values
      libraryContent => {
        const libraryContentDialogOutput: LibraryContentDialogOutput = {
          status : "VALIDATED",
          libraryContent : libraryContent 
        }
        this.dialogRef.close(libraryContentDialogOutput);
      }, 
      error => {
        // TODO : Create a http interceptor to catch all errors
      })

  }

}
