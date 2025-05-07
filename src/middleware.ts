import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicRoutes = [
    '/signin',
    '/register',
    '/forgot-password',
    '/api/auth',
];

export const middleware = async (request: NextRequest) => {
    const isPublicRoute = publicRoutes.some(
        (route) =>
            request.nextUrl.pathname === route ||
            request.nextUrl.pathname.startsWith(`${route}/`)
    );

    if (isPublicRoute) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });

    if (!token) {
        const loginUrl = new URL('/signin', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        // Match all paths except those that start with:
        // - api/auth (authentication API routes)
        // - _next (Next.js internals)
        // - static files (favicon.ico, etc.)
        '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
    ],
};
