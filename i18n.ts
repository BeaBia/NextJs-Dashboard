import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
 
const locales = ['en', 'pt'];
 
export default getRequestConfig(async (params: any) => {
  const locale = (await params.requestLocale) || params.locale;
 
  if (!locale || !locales.includes(locale)) {
    notFound();
  }
 
  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});