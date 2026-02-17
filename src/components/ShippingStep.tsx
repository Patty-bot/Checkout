'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { shippingSchema, ShippingFormData } from '@/lib/schemas';

interface ShippingStepProps {
  initialData?: Partial<ShippingFormData>;
  onSubmit: (data: ShippingFormData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
  error?: string;
}

export function ShippingStep({
  initialData,
  onSubmit,
  onBack,
  isLoading = false,
  error: externalError,
}: ShippingStepProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-black">{t('checkout.shipping.title')}</h2>

        {externalError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {externalError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.shipping.addressLine1')}
            </label>
            <input
              {...register('addressLine1')}
              id="addressLine1"
              type="text"
              placeholder={t('checkout.shipping.addressLine1Placeholder')}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
            />
            {errors.addressLine1 && (
              <p className="mt-1 text-sm text-red-600">{errors.addressLine1.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="streetName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.shipping.streetName')}
            </label>
            <input
              {...register('streetName')}
              id="streetName"
              type="text"
              placeholder={t('checkout.shipping.streetNamePlaceholder')}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
            />
            {errors.streetName && (
              <p className="mt-1 text-sm text-red-600">{errors.streetName.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.shipping.postcode')}
            </label>
            <input
              {...register('postcode')}
              id="postcode"
              type="text"
              placeholder={t('checkout.shipping.postcodePlaceholder')}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
            />
            {errors.postcode && (
              <p className="mt-1 text-sm text-red-600">{errors.postcode.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="shippingMethod"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.shipping.shippingMethod')}
            </label>
            <select
              {...register('shippingMethod')}
              id="shippingMethod"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
            >
              <option value="">-- Select a shipping method --</option>
              <option value="standard">{t('checkout.shipping.standard')}</option>
              <option value="express">{t('checkout.shipping.express')}</option>
              <option value="overnight">{t('checkout.shipping.overnight')}</option>
            </select>
            {errors.shippingMethod && (
              <p className="mt-1 text-sm text-red-600">{errors.shippingMethod.message}</p>
            )}
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
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          {t('checkout.buttons.next')}
        </button>
      </div>
    </form>
  );
}
