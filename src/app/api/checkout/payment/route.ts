import { NextRequest, NextResponse } from 'next/server';

const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 400));

export async function POST(request: NextRequest) {
  await simulateLatency();

  const body = await request.json();

  const { nameOnCard, cardNumber, expirationMonth, expirationYear, cvc } = body;

  // Validation
  if (!nameOnCard || !cardNumber || !expirationMonth || !expirationYear || !cvc) {
    return NextResponse.json(
      { error: 'All payment fields are required' },
      { status: 400 }
    );
  }

  if (!/^\d+$/.test(cardNumber) || cardNumber.length < 13 || cardNumber.length > 19) {
    return NextResponse.json(
      { error: 'Invalid card number' },
      { status: 400 }
    );
  }

  if (!/^\d{3,4}$/.test(cvc)) {
    return NextResponse.json(
      { error: 'Invalid CVC' },
      { status: 400 }
    );
  }

  // Simulate error for specific test card
  if (cardNumber === '4000000000000002') {
    return NextResponse.json(
      { error: 'Card declined' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Payment processed successfully',
    paymentId: 'pay_' + Date.now(),
  });
}
