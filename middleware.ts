import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // console.log(request);

  const theme = request.cookies.get('theme')?.value;

  if (theme === 'dark') {
    const response = NextResponse.next();
    response.headers.set('theme', 'dark');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
