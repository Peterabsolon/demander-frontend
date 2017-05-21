export default function({ filter, limit, offset, sort }, defaultFilter) {
  // cba dealing with ? and &
  let query = '?foo=bar'

  query += filter || defaultFilter
  query += offset ? `&offset=${offset}` : ''
  query += limit ? `&limit=${limit}` : ''
  query += sort ? `&sort=${sort}` : ''

  return query
}
