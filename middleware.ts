import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // Lista de idiomas suportados
  locales: ['en', 'pt'],
 
  // Idioma padrão caso o navegador não informe nenhum compatível
  defaultLocale: 'en'
});
 
export const config = {
  // Matcher para ignorar rotas de API, arquivos estáticos e imagens do Next.js
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};