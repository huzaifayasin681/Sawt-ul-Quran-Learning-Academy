import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const adminSession = request.cookies.get('admin_session')
    const { pathname } = request.nextUrl

    // Protect all /admin routes
    if (pathname.startsWith('/admin')) {
        if (!adminSession || adminSession.value !== 'authenticated') {
            // Redirect unauthenticated users to the login page
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Optional: Redirect authenticated users away from /login back to /admin
    if (pathname === '/login') {
        if (adminSession && adminSession.value === 'authenticated') {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return NextResponse.next()
}

// Specify the paths the middleware should run on
export const config = {
    matcher: ['/admin/:path*', '/login'],
}
