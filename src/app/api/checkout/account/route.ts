import { NextRequest, NextResponse } from 'next/server';

const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 400));

export async function POST(request: NextRequest) {
  await simulateLatency();

  const body = await request.json();

  const { email, password } = body;

  // Validation
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  // Simulate error for specific test email
  if (email === 'error@test.com') {
    return NextResponse.json(
      { error: 'This email is already registered' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Account verified successfully',
    accountId: 'acc_' + Date.now(),
  });
}
