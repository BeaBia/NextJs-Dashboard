import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import createMiddleware from 'next-intl/middleware';


const intlMiddleware = createMiddleware({
  locales: ['en', 'pt'],
  defaultLocale: 'en',
});
 
//Inicialização do NextAuth
const {auth} = NextAuth(authConfig);

//Combinação: O NextAuth intercepta para segurança e repassa para o next-intl cuidar do idioma
export default auth((req) => {
  return intlMiddleware(req);
});
 
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)'],
};