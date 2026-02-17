import { NextRequest, NextResponse } from 'next/server';

const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 400));

export async function POST(request: NextRequest) {
  await simulateLatency();

  const body = await request.json();

  const { addressLine1, streetName, postcode, shippingMethod } = body;

  // Validation
  if (!addressLine1 || !streetName || !postcode || !shippingMethod) {
    return NextResponse.json(
      { error: 'All shipping fields are required' },
      { status: 400 }
    );
  }

  // Simulate error for invalid postcode for testing
  if (postcode === '00000') {
    return NextResponse.json(
      { error: 'Invalid postcode' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Shipping address verified',
    shippingId: 'ship_' + Date.now(),
  });
}
