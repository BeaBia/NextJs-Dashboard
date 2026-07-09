import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// O Serviço SÓ recebe os dados já prontos e insere no banco.
// Se o banco falhar, ele apenas avisa que falhou (throw).
export async function createInvoiceService(customerId: string, amount: number, status: string, date: string) {
  const amountInCents = amount * 100;
  
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
}