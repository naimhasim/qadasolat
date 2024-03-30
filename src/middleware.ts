import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // return NextResponse.rewrite(new URL('/api/auth/signin', request.url))
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next();
}

export const config = { matcher: ["/dashboard"] }