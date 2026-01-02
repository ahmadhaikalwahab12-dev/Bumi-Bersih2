import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token');

    // Check if the user is trying to access the profile page
    if (pathname.startsWith('/profile')) {
        // If no token is found, redirect to the sign-in page
        if (!token) {
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*'],
};