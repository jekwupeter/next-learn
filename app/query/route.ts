import postgres from 'postgres';
// import { supabaseClient } from "../lib/supabase-client";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 1250;
  `;

	return data;
}

// async function listInvoices(){
//   const {data, error} = await supabaseClient
//     .from('invoices')
//     .select('amount, customers:customer_id(name)')
//     .eq('customers.id', 'invoices.customer_id');
//     // .eq('amount', 666);
  
//   if (error) {
//     console.error('Error fetching invoices:', error);
//     throw new Error (`Error fetching invoices: ${error.message}`);
//   }

//   return data;
// }

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
