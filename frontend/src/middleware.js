import {NextResponse} from 'next/server';
import {jwtVerify} from 'jose';

export async function middleware(req) {
    const token = req.cookies.get('session')?.value;

    if (!token) {
        // Если токена нет, перенаправляем на страницу входа
        return NextResponse.redirect(new URL('/', req.url));
    }
    try {
        // Декодируем токен и извлекаем информацию о пользователе
        const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        // Проверяем роль пользователя для /admin
        if (payload.role !== 1 && req.nextUrl.pathname.startsWith('/admin')) {
            // Если роль не равна 1, перенаправляем на страницу входа
            return NextResponse.redirect(new URL('/', req.url));
        }
        // Проверяем верификацию пользователя для /user
        if (!payload && req.nextUrl.pathname.startsWith('/user')) {
            // Если пользователь не верифицирован, перенаправляем на страницу входа
            return NextResponse.redirect(new URL('/', req.url));
        }
    } catch (err) {
        console.error('Invalid token:', err);
        // Если токен недействителен, перенаправляем на страницу входа
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Указываем пути, к которым будет применяться этот middleware
export const config = {
    matcher: ['/admin/:path*', '/user/:path*','/tour/:path*/:path*/book'], // Применяем middleware ко всем путям, начинающимся с /admin и /user
};
