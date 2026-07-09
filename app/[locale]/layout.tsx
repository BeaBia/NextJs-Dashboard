import SideNav from '@/app/ui/dashboard/side-nav/sidenav';
import Providers from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Extrai o locale da URL de forma segura
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;

  // Busca as mensagens correspondentes ao idioma atual no servidor
  const messages = await getMessages();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>

      <div className="grow p-6 md:overflow-y-auto md:p-12">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}


