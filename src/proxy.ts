import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // Protect /admin routes
  if (url.pathname.startsWith('/admin')) {
    const sessionCookie = req.cookies.get('admin_session');
    
    // If not authenticated, redirect to /login
    if (!sessionCookie || sessionCookie.value !== 'authenticated') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Prevent authenticated users from seeing /login page again
  if (url.pathname === '/login') {
    const sessionCookie = req.cookies.get('admin_session');
    if (sessionCookie && sessionCookie.value === 'authenticated') {
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/login'],
};
