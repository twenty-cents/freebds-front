import { LibrarySerieContent } from '../../collection/library-serie-content';
export interface Serie {
  categories?: string;
  externalId?: string;
  id?: number;
  langage?: string;
  origin?: string;
  pageThumbnailUrl?: string;
  pageUrl?: string;
  siteUrl?: string;
  status?: string;
  synopsys?: string;
  title?: string;
  librarySerieContent?: LibrarySerieContent;
}
