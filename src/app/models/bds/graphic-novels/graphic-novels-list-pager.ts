import { GraphicNovel } from './graphic-novel';

export interface GraphicNovelsListPager {
    content: GraphicNovel[],
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
