import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  const signInURL = new URL('/login', request.url);
  const serviceOrderURL = new URL('/auth/home', request.url);

  // Se não houver token, redireciona para '/login' para qualquer URL protegida
  if (!token) {
    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(signInURL);
    }
    return NextResponse.next();
  }

  // Se houver token e a URL for '/login' ou '/', redireciona para a tela de ordem de serviço
  if (token && request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(serviceOrderURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/auth/:path*',
  ],
};