export const setQueryPagination = (
    query: IQueryBuilderObj,
    queryParams: IProductQueryParams,
): IQueryBuilderObj => {
    if (queryParams?.page) {
        query.page = queryParams.page
        query.skip = queryParams.page - 1
        query.take = queryParams.perPage || 5
    }

    return query
}
