import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getURL from './libs/getURL';
import { getRequestJwtToken } from './libs/auth/getJwtToken';

// Define paths to protect for logged-in users
const authPaths = ['/auth/signin', '/auth/signup', '/api/auth/signin'];

export async function middleware(req: NextRequest) {
    const token = await getRequestJwtToken(req);

    if (authPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
      if (token) {
        return NextResponse.redirect(getURL('/'));
      }
    }
  
    // Allow the request to continue if the user is not authenticated
    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};
