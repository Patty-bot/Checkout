'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StepIndicator } from './StepIndicator';
import { OrderSummary } from './OrderSummary';
import { AccountStep } from './AccountStep';
import { ShippingStep } from './ShippingStep';
import { PaymentStep } from './PaymentStep';
import {
  submitAccount,
  submitShipping,
  submitPayment,
  completeOrder,
} from '@/lib/api';
import { AccountFormData, ShippingFormData, PaymentFormData } from '@/lib/schemas';

export function Checkout() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Form data
  const [accountData, setAccountData] = useState<Partial<AccountFormData>>({});
  const [shippingData, setShippingData] = useState<Partial<ShippingFormData>>({});
  const [paymentData, setPaymentData] = useState<Partial<PaymentFormData>>({});

  // API response data
  const [accountId, setAccountId] = useState<string | null>(null);
  const [shippingId, setShippingId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const steps = [
    t('checkout.steps.account'),
    t('checkout.steps.shipping'),
    t('checkout.steps.payment'),
  ];

  const handleAccountSubmit = async (data: AccountFormData) => {
    setError(null);
    setIsLoading(true);
    try {
      setAccountData(data);
      const result = await submitAccount(data);
      setAccountId(result.accountId);
      setCurrentStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingSubmit = async (data: ShippingFormData) => {
    setError(null);
    setIsLoading(true);
    try {
      setShippingData(data);
      const result = await submitShipping(data);
      setShippingId(result.shippingId);
      setCurrentStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    setError(null);
    setIsLoading(true);
    try {
      setPaymentData(data);
      const result = await submitPayment(data);
      setPaymentId(result.paymentId);

      // Complete the order
      if (accountId && shippingId) {
        const completeResult = await completeOrder(accountId, shippingId, result.paymentId);
        setOrderId(completeResult.orderId);
        setSuccessMessage(t('checkout.success.orderComplete'));
        setCurrentStep(3);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {successMessage}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('checkout.success.orderId')}: <span className="font-semibold">{orderId}</span>
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          {t('checkout.title')}
        </h1>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
            {currentStep === 0 && (
              <AccountStep
                initialData={accountData}
                onSubmit={handleAccountSubmit}
                isLoading={isLoading}
                error={error || undefined}
              />
            )}

            {currentStep === 1 && (
              <ShippingStep
                initialData={shippingData}
                onSubmit={handleShippingSubmit}
                onBack={handleBack}
                isLoading={isLoading}
                error={error || undefined}
              />
            )}

            {currentStep === 2 && (
              <PaymentStep
                initialData={paymentData}
                onSubmit={handlePaymentSubmit}
                onBack={handleBack}
                isLoading={isLoading}
                error={error || undefined}
              />
            )}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
