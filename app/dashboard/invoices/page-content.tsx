'use client'; // Aqui vive o cliente!

import { useQuery } from '@tanstack/react-query';
import Table from '@/app/ui/invoices/table';
import { fetchInvoicesPages } from '@/app/lib/data'; // Sua função

export default function InvoicesPageContent() {
  const { data, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoicesPages,
  });

  if (isLoading) return <div>Carregando...</div>;

  return <Table invoices={data} />;
}