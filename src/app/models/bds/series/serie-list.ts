export interface SerieList {
    content: [
        {
          categories: string,
          externalId: string,
          id: bigint,
          langage: string,
          origin: string,
          pageThumbnailUrl: string,
          pageUrl: string,
          siteUrl: string,
          status: string,
          synopsys: string,
          title: string
        }
      ],
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
