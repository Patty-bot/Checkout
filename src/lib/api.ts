import { AccountFormData, ShippingFormData, PaymentFormData } from './schemas';

interface ApiResponse<T> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
}

export async function fetchOrderSummary() {
  const response = await fetch('/api/checkout/summary');
  if (!response.ok) {
    throw new Error('Failed to fetch order summary');
  }
  return response.json();
}

export async function submitAccount(data: AccountFormData) {
  const response = await fetch('/api/checkout/account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to validate account');
  }

  return result;
}

export async function submitShipping(data: ShippingFormData) {
  const response = await fetch('/api/checkout/shipping', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to validate shipping');
  }

  return result;
}

export async function submitPayment(data: PaymentFormData) {
  const response = await fetch('/api/checkout/payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to process payment');
  }

  return result;
}

export async function completeOrder(accountId: string, shippingId: string, paymentId: string) {
  const response = await fetch('/api/checkout/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accountId, shippingId, paymentId }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to complete order');
  }

  return result;
}
