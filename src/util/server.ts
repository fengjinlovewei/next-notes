import { cookies, headers } from 'next/headers';

interface HeaderQuery {
  search?: string;
}

export function getHeaderQuery() {
  const header = headers();
  const queryStr = decodeURIComponent(header.get('x-query-data')!);
  const XQueryData = JSON.parse(queryStr) as HeaderQuery;

  return XQueryData;
}
