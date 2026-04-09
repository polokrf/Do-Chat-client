import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function proxy (req) {

  const token = await getToken({ req })
  const { pathname } = req.nextUrl;
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (pathname.startsWith('/dashboard') && token?.role !== 'user') {
    return NextResponse.redirect(new URL('/', req.url));
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
