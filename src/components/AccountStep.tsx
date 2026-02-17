'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { accountSchema, AccountFormData } from '@/lib/schemas';

interface AccountStepProps {
  initialData?: Partial<AccountFormData>;
  onSubmit: (data: AccountFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function AccountStep({
  initialData,
  onSubmit,
  isLoading = false,
  error: externalError,
}: AccountStepProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-black">{t('checkout.account.title')}</h2>

        {externalError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {externalError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.account.email')}
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder={t('checkout.account.emailPlaceholder')}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('checkout.account.password')}
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder={t('checkout.account.passwordPlaceholder')}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
            />
            <p className="mt-1 text-xs text-gray-500">{t('checkout.account.passwordHint')}</p>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
        {t('checkout.buttons.next')}
      </button>
    </form>
  );
}
