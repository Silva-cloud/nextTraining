import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
// const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

async function getPosts() {
  const jsonResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const response = await jsonResponse.json();
  return response;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    return Response.json(await getPosts());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
