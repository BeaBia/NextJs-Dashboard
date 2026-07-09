import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createInvoiceService } from '@/app/lib/invoice.service';

const FormSchema = z.object({
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedFields = FormSchema.safeParse(body);

    // Se a validação falhar, retornamos um status 400 (Bad Request)
    if (!validatedFields.success) {
      return NextResponse.json(
        { 
          message: 'Invalid or missing fields.', 
          errors: validatedFields.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { customerId, amount, status } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    await createInvoiceService(customerId, amount, status, date);

    return NextResponse.json(
      { message: 'Invoice created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      { message: 'Database Error: Failed to Create Invoice.' },
      { status: 500 }
    );
  }
}