// middleware.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type MiddlewareFn = (
  request: NextRequest,
  response: NextResponse,
) => Promise<any>;

type WithMiddlewareFn = (middleware: any) => MiddlewareFn;

const send: MiddlewareFn = async (request, response) => response;

function chain(functions: WithMiddlewareFn[], index = 0): any {
  const current = functions[index];
  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }
  return send;
}

const withMiddlewareFirst: WithMiddlewareFn = (middleware) => {
  return async (request) => {
    const response = NextResponse.next();
    return middleware(request, response);
  };
};

const withMiddlewarSetData: WithMiddlewareFn = (middleware) => {
  return async (request, response) => {
    // console.log('request', request);
    // console.log('middleware2 ' + request.url);

    // console.log(request.nextUrl.searchParams);

    const query: Record<string, string> = {};

    for (const [key, value] of request.nextUrl.searchParams) {
      query[key] = value;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-query-data', JSON.stringify(query));

    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.headers.set('X-ceshi', 'ceshi');

    return middleware(request, response);
  };
};

const withMiddleware3: WithMiddlewareFn = (middleware) => {
  return async (request, response) => {
    console.log('middleware3 ' + request.url);
    return middleware(request, response);
  };
};

export const config = {
  matcher: [
    /*
     * 匹配所有的路径除了以这些作为开头的：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|static).*)',
  ],
};

export default chain([withMiddlewareFirst, withMiddlewarSetData]);
