import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {

  currentLibraryId: number = 1;

  constructor() { }

  getCurrentId(): number {
    return this.currentLibraryId;
  }
}
