'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Navigation Icons */}
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              title="Home"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4" />
              </svg>
              <span className="hidden sm:inline text-sm">Home</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              title="Shop"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline text-sm">Shop</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              title="Contact"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline text-sm">Contact</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              title="Help"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline text-sm">Help</span>
            </a>
          </nav>

          {/* Right Section: Account & Cart */}
          <div className="flex items-center gap-6">
            {/* Account Icon */}
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              title="Account"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden sm:inline text-sm">Account</span>
            </a>

            {/* Cart Icon with item count */}
            <a
              href="#"
              className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              title="Shopping Cart"
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="hidden sm:inline text-sm">Cart</span>
            </a>

            {/* Language Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === 'es'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          i18n.language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          i18n.language === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        ES
      </button>
    </div>
  );
}
