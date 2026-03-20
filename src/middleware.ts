import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define which paths are "Secret"
  if (pathname.startsWith('/protected')) {
    
    // 2. Make sure they're logged in first
    

    // 3. Check for the "Family Secret" cookie
    const isFamily = request.cookies.get('family_recipe_access');

    // 4. If the cookie is missing, send them to the entry gate
    if (!isFamily) {
      return NextResponse.redirect(new URL('/enter-cookbook', request.url));
    }
  }

  return NextResponse.next();
}

// 4. Optimization: Only run middleware on these specific routes
export const config = {
  matcher: ['/protected/:path*'],
};