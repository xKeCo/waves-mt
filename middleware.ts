import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

export default auth((req: NextRequest) => {
  const { auth: reqAuth, nextUrl } = req as any;
  const { pathname } = nextUrl;
  const isAuth = !!reqAuth;

  if (!isAuth && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isAuth) {
    const { user } = reqAuth;
    const userPath = `/${user?.username}`;
    const availableWorkspaces = user?.workspaces?.map((workspace: any) => workspace.slug) || [];
    const activeWorkspace = cookies().get('activeWorkspace')?.value ?? availableWorkspaces[0];
    const dashboardUrl = new URL(`${userPath}/${activeWorkspace}/dashboard`, req.url);

    if (pathname === '/' || !pathname.startsWith(userPath)) {
      return NextResponse.redirect(dashboardUrl);
    }

    const currentWorkspace = pathname.split('/')[2];
    if (pathname.startsWith(userPath) && !availableWorkspaces.includes(currentWorkspace)) {
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
