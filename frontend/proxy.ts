import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token");
    const path = request.nextUrl.pathname;

    // Sudah login, jangan buka /login atau /register
    if (token && (path.startsWith("/login") || path.startsWith("/register"))) {
        return NextResponse.redirect(new URL("/users", request.url));
    }

    // Belum login, blokir /users
    if (!token && path.startsWith("/users")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/users/:path*"],
};
