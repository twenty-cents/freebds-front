export interface Review {
    id?: number;
    userId?: number;
    librarySerieContentId?: number;
    libraryContentId?: number;
    rating?: number;
    comment?: string;
    lastUpdateDate?: string;
    lastUpdateUser?: string;
}
