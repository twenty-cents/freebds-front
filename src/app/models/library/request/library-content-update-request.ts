export interface LibraryContentUpdateRequest {
    libraryId?: number;
    libraryContentId?: number;
    isFavorite?: boolean;
    isPhysical?: boolean;
    isNumeric?: boolean;
    isWishlist?: boolean;
}
