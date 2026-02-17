import { z } from 'zod';

export const accountSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const shippingSchema = z.object({
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  streetName: z.string().min(1, 'Street name is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  shippingMethod: z.enum(['standard', 'express', 'overnight']),
});

export const paymentSchema = z.object({
  nameOnCard: z.string().min(1, 'Name on card is required'),
  cardNumber: z
    .string()
    .regex(/^\d+$/, 'Card number must contain only digits')
    .min(13, 'Card number too short')
    .max(19, 'Card number too long'),
  expirationMonth: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
  expirationYear: z
    .string()
    .regex(/^\d{4}$/, 'Invalid year'),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, 'CVC must be 3-4 digits'),
});

export type AccountFormData = z.infer<typeof accountSchema>;
export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
