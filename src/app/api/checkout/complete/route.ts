import { NextRequest, NextResponse } from 'next/server';

const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 400));

export async function POST(request: NextRequest) {
  await simulateLatency();

  const body = await request.json();

  const { accountId, shippingId, paymentId } = body;

  if (!accountId || !shippingId || !paymentId) {
    return NextResponse.json(
      { error: 'Missing required order information' },
      { status: 400 }
    );
  }

  const orderId = 'ORD-' + Date.now();

  return NextResponse.json({
    success: true,
    message: 'Order completed successfully',
    orderId,
    total: 124.99,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });
}
