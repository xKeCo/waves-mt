import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAuth = !!req.auth;
  const isRestrictedPage = ['/', '/login', '/register'].includes(req.nextUrl.pathname);
  const userPath = `/${req?.auth?.user?.username}`;

  if (!isAuth && !isRestrictedPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isAuth) {
    if (req.nextUrl.pathname === '/' || !req.nextUrl.pathname.startsWith(userPath)) {
      return NextResponse.redirect(new URL(userPath, req.url));
    }
  }
});

export const config = {
  matcher: ['/', '/login', '/register', '/:username/'],
};
