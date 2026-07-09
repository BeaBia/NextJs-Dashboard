'use client'

import { CustomerField, Invoice, InvoiceForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import styles from './create-form.module.scss';

//ZOD, REACT HOOK FORM E TANSATCK QUERY
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { register } from 'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup';
import { error } from 'next/dist/build/output/log';
import { ErrorSource } from 'next/dist/server/web/sandbox';
import { useTranslations } from 'next-intl'; // Import normal, sem o /server

//IMPORT COM SERVICES COM AXIOS
import axios from 'axios';
import { useState } from 'react'; 


const InvoiceSchema = z.object({
  //customerId
  customerId: z.string().min(1, {message: 'Selecione um cliente'}),
  //amount
  amount: z.coerce.number().gt(0, {message: 'Valor deve ser maior que 0.'}),
  //status
  status: z.enum(['pending' , 'paid'], {invalid_type_error: 'Selecione o status.'}),
})

type InvoiceFormData = z.infer<typeof InvoiceSchema>;

export default function Form({ customers }: { customers: CustomerField[] }) {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm <InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
  });
  
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      //Chama a Server Action do arquivo actions.ts
      const response = await axios.post('/api/invoice', data);
      return response.data;
    }, 
    onSuccess: () => {
      router.refresh(); //antes tinha o revalidatePath em action como server actions, 
      //agr n tem mais. é uma API REST isolada
      router.push('/dashboard/invoices');
    },

  });

  const onSubmit = (data: InvoiceFormData) => {
    mutation.mutate(data);
  };

  const t = useTranslations('InvoiceForm');

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="customer" className={styles.label}>{t('customerLabel')}</label>
        <div className={styles.inputWrapper}>
          <select
            id="customer"
            {...register( 'customerId' )}
            className={styles.inputField}
            defaultValue=""
            aria-describedby="customer-error"
          >
            <option value="" disabled>{t('customerPlaceholder')}</option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {errors.customerId && (
            <p className={styles.errorMessage}>{errors.customerId.message}</p>
          )}
        </div>
      </div>

      {/* Invoice Amount */}

      <div className={styles.inputGroup}>
        <label htmlFor="amount" className={styles.label}>{t('amountLabel')}</label>
        <div className={styles.inputWrapper}>
          <input
            id="amount"
            placeholder="Enter USD amount"
            {...register('amount')}
            className={styles.inputField}
            aria-describedby="amount-error"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {errors.amount && (
            <p className={styles.errorMessage}> {errors.amount.message}</p>
          )}
        </div>
      </div>

      {/* Invoice Status */}
      <fieldset>
        <legend className={styles.label}>{t('statusLabel')}</legend>
        <div className={styles.statusContainer}>
          <div className="flex items-center">
            <input
              id="pending"
              {...register('status')}
              type="radio"
              value="pending"
              className="h-4 w-4 cursor-pointer"
              aria-describedby="status-error"
            />
            <label htmlFor="pending" className={`${styles.radioLabel} ${styles.radioPending}`}>
              {t('statusPending')} <ClockIcon className="h-4 w-4" />
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="paid"
              {...register('status')}
              type="radio"
              value="paid"
              className="h-4 w-4 cursor-pointer"
            />
            <label htmlFor="paid" className={`${styles.radioLabel} ${styles.radioPaid}`}>
              {t('statusPaid')} <CheckIcon className="h-4 w-4" />
            </label>
          </div>
        </div>
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {errors.status && (
            <p className={styles.errorMessage}> {errors.status?.message}</p>
          )}
        </div>
      </fieldset>

      <div id="form-error" aria-live="polite" aria-atomic="true">
        {mutation.isError && (
          <p className={styles.errorMessage}>
              {axios.isAxiosError(mutation.error) 
              ? mutation.error.response?.data?.message || 'Erro de comunicação com o servidor.' 
              : 'Failed to create invoice. Please try again.'}          </p>
        )}
      </div>
      
      <div className={styles.buttonGroup}>
        <Link href="/dashboard/invoices" className={`${styles.btn} ${styles.btnCancel}`}>
         {t('cancelButton')}
        </Link>

        <Button 
        type="submit" 
        className={styles.btnSubmit}
        disabled={mutation.isPending}
        >
          {mutation.isPending? 'Creating...': t('submitButton')}
        </Button>
      </div>
    </form>
  );
}
