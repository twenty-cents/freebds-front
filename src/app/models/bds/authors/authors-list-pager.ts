import { Author } from '../authors/author';

export interface AuthorsListPager {
    content: Author[],
    empty: true,
    first: true,
    last: true,
    number: number,
    numberOfElements: number,
    pageable: {
        page: number,
        size: number,
        sort: string
    },
    size: number,
    sort: {
        empty: true,
        sorted: true,
        unsorted: true
    },
    totalElements: number,
    totalPages: number
}
