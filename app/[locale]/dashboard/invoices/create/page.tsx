import Form from '@/app/ui/invoices/create-form/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { getTranslations } from 'next-intl/server'; 

export default async function Page() {
  const customers = await fetchCustomers();

    // Puxa as traduções (precisa do await pq estamos no servidor)
  const t = await getTranslations('InvoiceForm'); 
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t('breadcrumbsInvoices'), href: '/dashboard/invoices' },
          {
            label: t('breadcrumbsCreate'),
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}

