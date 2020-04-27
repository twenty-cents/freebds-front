import { Serie } from '../series/serie';
import { LibraryContent } from '../../collection/library-content';
import { Review } from '../../collection/review';
export interface GraphicNovel {
    id?: number;
    externalId?: string;
    graphicNovel_Url?: string;
    tome?: string;
    numEdition?: string;
    title?: string;
    publisher?: string;
    collection?: string;
    authorRoles?: [
        {
            id?: number;
            role?: string;
            firstname?: string;
            lastname?: string;
            nickname?: string;
        }
    ];
    publicationDate?: string;
    releaseDate?: string;
    isbn?: string;
    totalPages?: number;
    format?: string;
    infoEdition?: string;
    isOriginalEdition?: boolean;
    externalIdOriginalPublication?: string;
    isIntegrale?: boolean
    isBroche?: boolean;
    coverPictureUrl?: string;
    coverThumbnailUrl?: string;
    backCoverPictureUrl?: string;
    backCoverThumbnailUrl?: string;
    pageUrl?: string;
    pageThumbnailUrl?: string;
    serie?: Serie;
    libraryContent?: LibraryContent;
    reviews?: Review[];
}
