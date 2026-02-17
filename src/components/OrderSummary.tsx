'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchOrderSummary } from '@/lib/api';

interface OrderSummaryData {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export function OrderSummary() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState<OrderSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    fetchOrderSummary()
      .then(setSummary)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleApplyDiscount = () => {
    if (discountCode.length > 0) {
      // Simulate discount: 10% off
      if (summary) {
        const discount = summary.subtotal * 0.1;
        setDiscountAmount(discount);
        setDiscountApplied(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 text-black">{t('checkout.orderSummary')}</h3>
        <div className="bg-gray-300 h-40 rounded-lg mb-4 animate-pulse"></div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: summary.currency,
    }).format(amount);
  };

  const finalTotal = summary.total - discountAmount;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-lg mb-4 text-black">{t('checkout.orderSummary')}</h3>

      <div className="mb-4">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
          alt="Product"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      </div>

      {/* Discount Code Section */}
      <div className="mb-4 pb-4 border-b border-gray-200 overflow-hidden">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 text-black">
          Gift Card / Discount Code
        </label>
        <div className="flex gap-1 items-stretch w-full">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => {
              setDiscountCode(e.target.value);
              if (discountApplied && e.target.value === '') {
                setDiscountApplied(false);
                setDiscountAmount(0);
              }
            }}
            placeholder="Enter code"
            disabled={discountApplied}
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-black placeholder-gray-400 text-xs disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyDiscount}
            disabled={discountApplied || !discountCode}
            className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center whitespace-nowrap flex-shrink-0"
          >
            Apply
          </button>
        </div>
        {discountApplied && (
          <p className="text-xs text-green-600 mt-1.5">✓ {discountCode} applied (10% off)</p>
        )}
      </div>

      <div className="space-y-3 mb-4">
        {summary.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium text-black">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3 space-y-2 mb-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span className="text-black">{formatCurrency(summary.subtotal)}</span>
        </div>
        {discountApplied && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Tax:</span>
          <span className="text-black">{formatCurrency(summary.tax)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping:</span>
          <span className="text-black">{formatCurrency(summary.shipping)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
        <span className="text-black">Total:</span>
        <span className="text-blue-600">{formatCurrency(finalTotal)}</span>
      </div>
    </div>
  );
}
