'use client';

import React from 'react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
              index < currentStep
                ? 'bg-green-500 text-white'
                : index === currentStep
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index < currentStep ? '✓' : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 mx-2 transition-colors ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}
              style={{ maxWidth: '100px' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
