'use client'

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import styles from './create-form.module.scss';


export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="customer" className={styles.label}>Choose customer</label>
        <div className={styles.inputWrapper}>
          <select
            id="customer"
            name="customerId"
            className={styles.inputField}
            defaultValue=""
            aria-describedby="customer-error"
          >
            <option value="" disabled>Select a customer</option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.customerId?.map((error: string) => (
            <p className={styles.errorMessage} key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Invoice Amount */}

      <div className={styles.inputGroup}>
        <label htmlFor="amount" className={styles.label}>Choose an amount</label>
        <div className={styles.inputWrapper}>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="Enter USD amount"
            className={styles.inputField}
            aria-describedby="amount-error"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.amount?.map((error: string) => (
            <p className={styles.errorMessage} key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Invoice Status */}
      <fieldset>
        <legend className={styles.label}>Set the invoice status</legend>
        <div className={styles.statusContainer}>
          <div className="flex items-center">
            <input
              id="pending"
              name="status"
              type="radio"
              value="pending"
              className="h-4 w-4 cursor-pointer"
              aria-describedby="status-error"
            />
            <label htmlFor="pending" className={`${styles.radioLabel} ${styles.radioPending}`}>
              Pending <ClockIcon className="h-4 w-4" />
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="paid"
              name="status"
              type="radio"
              value="paid"
              className="h-4 w-4 cursor-pointer"
            />
            <label htmlFor="paid" className={`${styles.radioLabel} ${styles.radioPaid}`}>
              Paid <CheckIcon className="h-4 w-4" />
            </label>
          </div>
        </div>
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status?.map((error: string) => (
            <p className={styles.errorMessage} key={error}>{error}</p>
          ))}
        </div>
      </fieldset>

      <div id="form-error" aria-live="polite" aria-atomic="true">
        {state.message && <p className={styles.errorMessage}>{state.message}</p>}
      </div>
      
      <div className={styles.buttonGroup}>
        <Link href="/dashboard/invoices" className={`${styles.btn} ${styles.btnCancel}`}>
          Cancel
        </Link>
        <Button type="submit" className={styles.btnSubmit}>Create Invoice</Button>
      </div>
    </form>
  );
}