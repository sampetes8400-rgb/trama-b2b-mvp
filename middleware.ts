/**
 * Middleware simple para proteger paneles sensibles del MVP.
 */
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/mi-negocio/:path*', '/admin/:path*']
};
