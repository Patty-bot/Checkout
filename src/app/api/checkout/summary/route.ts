import { NextResponse } from 'next/server';

const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 400));

export async function GET() {
  await simulateLatency();

  const summary = {
    subtotal: 99.99,
    tax: 15.0,
    shipping: 10.0,
    total: 124.99,
    currency: 'USD',
    items: [
      {
        id: '1',
        name: 'Headsets',
        price: 99.99,
        quantity: 1,
      },
      {
        id: '2',
        name: 'Audio Cable',
        price: 15.00,
        quantity: 1,
      },
      {
        id: '3',
        name: 'Protective Case',
        price: 25.00,
        quantity: 1,
      },
    ],
  };

  return NextResponse.json(summary);
}
