'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { paymentSchema, PaymentFormData } from '@/lib/schemas';

interface PaymentStepProps {
  initialData?: Partial<PaymentFormData>;
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
  error?: string;
}

export function PaymentStep({
  initialData,
  onSubmit,
  onBack,
  isLoading = false,
  error: externalError,
}: PaymentStepProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-black">{t('checkout.payment.title')}</h2>

        {externalError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {externalError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="nameOnCard"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.payment.nameOnCard')}
            </label>
            <input
              {...register('nameOnCard')}
              id="nameOnCard"
              type="text"
              placeholder={t('checkout.payment.nameOnCardPlaceholder')}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
            />
            {errors.nameOnCard && (
              <p className="mt-1 text-sm text-red-600">{errors.nameOnCard.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.payment.cardNumber')}
            </label>
            <input
              {...register('cardNumber')}
              id="cardNumber"
              type="text"
              placeholder={t('checkout.payment.cardNumberPlaceholder')}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="expirationMonth"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('checkout.payment.expirationMonth')}
              </label>
              <input
                {...register('expirationMonth')}
                id="expirationMonth"
                type="text"
                placeholder="MM"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
              />
              {errors.expirationMonth && (
                <p className="mt-1 text-sm text-red-600">{errors.expirationMonth.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="expirationYear"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('checkout.payment.expirationYear')}
              </label>
              <input
                {...register('expirationYear')}
                id="expirationYear"
                type="text"
                placeholder="YYYY"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
              />
              {errors.expirationYear && (
                <p className="mt-1 text-sm text-red-600">{errors.expirationYear.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('checkout.payment.cvc')}
              </label>
              <input
                {...register('cvc')}
                id="cvc"
                type="text"
                placeholder={t('checkout.payment.cvcPlaceholder')}
                disabled={isLoading}
                maxLength={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
              />
              {errors.cvc && (
                <p className="mt-1 text-sm text-red-600">{errors.cvc.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          {t('checkout.buttons.back')}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          {t('checkout.buttons.completeOrder')}
        </button>
      </div>
    </form>
  );
}
