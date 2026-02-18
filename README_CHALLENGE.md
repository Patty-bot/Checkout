# Checkout Flow Interview Task - Solution

A fully functional, production-ready checkout flow application built with **Next.js 16**, **TypeScript**, **React Hook Form**, **Zod validation**, and **i18n support** (English & Spanish).

## Objective

We implemented a 3-step checkout flow with account verification, shipping address, and payment information collection. This solution demonstrates:

- **UI Implementation Fidelity** - Responsive design matching Figma specifications
- **API Integration** - Dummy backend using Next.js API routes
- **Form Validation** - Client-side validation with inline error messages
- **Internationalization** - Support for multiple languages (EN/ES)
- **State Management** - Proper form data persistence across steps
- **Loading & Error States** - Comprehensive UX feedback
- **Testing** - Integration test for happy path checkout flow

## Features Implemented

### 1. **3-Step Checkout Flow**

#### Step 1: Account
- Email input (required, valid email format) // you can input any email as long as it meets the requirement of an email.
- Password input (required, min 8 characters) // input any password but follow the rule of 8 characters.
- Inline validation with error messages
- Form data persistence

#### Step 2: Shipping
- Address Line 1 (required)
- Street Name (required)
- Postcode (required)
- Shipping Method selector (Standard/Express/Overnight)
- Back/Next navigation
- Form data preservation

#### Step 3: Payment
- Name on Card (required)
- Card Number (required, 13-19 digits)
- Expiration Month/Year (required, MM/YYYY format)
- CVC (required, 3-4 digits)
- Back/Complete Order buttons
- Real-time validation feedback

### 2. **Progress Indicator**

- Visual step indicator with completed/current state styling
- Color-coded steps (completed=green, current=blue, pending=gray)
- Connection lines between steps

### 3. **Order Summary Card**

- Real-time order data fetched from API
- Line item breakdown
- Subtotal, Tax, Shipping calculation
- Total amount in bold
- Sticky positioning on desktop (side panel)
- Currency formatting (USD)
- Responsive layout

### 4. **API Integration**

All API endpoints are implemented as Next.js route handlers:

```
GET  /api/checkout/summary
POST /api/checkout/account
POST /api/checkout/shipping
POST /api/checkout/payment
POST /api/checkout/complete
```

**Features:**
- Simulated network latency (400-800ms per request)
- Comprehensive validation on backend
- Realistic error responses
- Mock payloads with accountId/shippingId/paymentId tracking
- Order completion with orderId generation

### 5. **Form Validation**

**Validation Schema (Zod):**
- Email: Valid email format
- Password: Minimum 8 characters
- Address fields: Non-empty strings
- Shipping method: Valid enum selection
- Card number: 13-19 digit numbers only
- CVC: 3-4 digits only
- Expiration: Valid MM/YYYY format

**Validation Features:**
- Real-time client-side validation
- Prevents step progression on invalid data
- Inline error messages below each field
- Server-side verification
- Error prevention with disabled form during submission

### 6. **Internationalization (i18n)**

**Supported Languages:**
- English (en)
- Spanish (es)

**Localized Elements:**
- All UI labels and buttons
- Error messages
- Validation feedback
- Field placeholders
- Success messages
- Currency formatting

**Implementation:**
- react-i18next for client-side i18n
- JSON-based translation files in `/src/i18n/locales/`
- Language switcher component (EN/ES buttons)
- Persistent language selection in session

### 7. **Loading & Error States**

**Loading Indicators:**
- Spinning loader during API calls
- Disabled form inputs while submitting
- Disabled buttons during submission

**Error Handling:**
- Clear error messages displayed above form
- Network error handling
- API validation errors
- User-friendly error feedback
- Error clearing on form changes

### 8. **Success State**

- Celebratory success screen after order completion
- Large checkmark icon
- Order ID display
- "Continue Shopping" button
- Professional messaging

### 9. **Responsive Design**

- Desktop: 2-column layout (form + order summary side)
- Tablet: Adjusted padding and spacing
- Mobile: Single-column layout with full-width forms
- Sticky order summary on desktop
- Touch-friendly button sizing
- Accessible form inputs

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Form Management:** React Hook Form v7
- **Validation:** Zod v4
- **Internationalization:** react-i18next v16
- **Testing:** Jest v30 + Testing Library v16
- **Package Manager:** pnpm

## Installation & Setup

### Prerequisites

- Node.js 18+ (tested with Node 20)
- pnpm v10+ (or npm/yarn as alternative)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Development Server

```bash
pnpm dev
```

The application will be available at: **http://localhost:3000**

### 3. Build for Production

```bash
pnpm build
pnpm start
```

### 4. Run Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch
```

### 5. Linting

```bash
pnpm lint
```

## 📡 API Endpoints

### `GET /api/checkout/summary`

Fetches the order summary with items, pricing, and total.

**Response:**
```json
{
  "subtotal": 99.99,
  "tax": 15.0,
  "shipping": 10.0,
  "total": 124.99,
  "currency": "USD",
  "items": [
    {
      "id": "1",
      "name": "Premium Product",
      "price": 99.99,
      "quantity": 1
    }
  ]
}
```

### `POST /api/checkout/account`

Validates account credentials.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "accountId": "acc_1234567890"
}
```

**Response (Error):**
```json
{
  "error": "Invalid email format"
}
```

### `POST /api/checkout/shipping`

Validates and stores shipping address.

**Request:**
```json
{
  "addressLine1": "123 Main St",
  "streetName": "Main Street",
  "postcode": "12345",
  "shippingMethod": "standard"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Shipping address verified",
  "shippingId": "ship_1234567890"
}
```

### `POST /api/checkout/payment`

Processes payment information.

**Request:**
```json
{
  "nameOnCard": "John Doe",
  "cardNumber": "4111111111111111",
  "expirationMonth": "12",
  "expirationYear": "2025",
  "cvc": "123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "paymentId": "pay_1234567890"
}
```

### `POST /api/checkout/complete`

Completes the order with account, shipping, and payment IDs.

**Request:**
```json
{
  "accountId": "acc_1234567890",
  "shippingId": "ship_1234567890",
  "paymentId": "pay_1234567890"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Order completed successfully",
  "orderId": "ORD-1234567890",
  "total": 124.99,
  "estimatedDelivery": "2026-02-24T12:00:00Z"
}
```

## Testing

### Test Coverage

The application includes an integration test for the **happy path** checkout flow:

**Test File:** `__tests__/checkout.happy-path.test.tsx`

**What's Tested:**
1. Account step validation and submission
2. Shipping step data entry and submission
3. Payment step data entry and submission
4. Order completion and success message
5. Navigation back through steps with data preservation
6. API integration with mocked endpoints

**Run Tests:**
```bash
pnpm test
# or
pnpm test:watch
```

### Manual Testing

**Happy Path Flow:**
1. Enter email: `test@example.com`
2. Enter password: `password123`
3. Click Next
4. Enter address: `123 Main St`
5. Enter street: `Main Street`
6. Enter postcode: `12345`
7. Select shipping: `Standard (5-7 days)`
8. Click Next
9. Enter name: `John Doe`
10. Enter card: `4111111111111111`
11. Enter expiry: `12/2025`
12. Enter CVC: `123`
13. Click Complete Order
14. See success message with Order ID

**Error Testing:**
- Try email: `error@test.com` → API returns error
- Try postcode: `00000` → API returns error
- Try card: `4000000000000002` → API returns declined error

## Internationalization (i18n)

### Language Switcher

Located in the top-right corner with EN/ES buttons.

### Translation Files

**English:** `src/i18n/locales/en.json`
**Spanish:** `src/i18n/locales/es.json`

### Adding New Strings

1. Add key to both `en.json` and `es.json`
2. Use in components: `const { t } = useTranslation(); t('key.path')`

### Currency Formatting

Uses `Intl.NumberFormat` for locale-aware currency display:
```typescript
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(amount);
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── checkout/
│   │       ├── account/route.ts
│   │       ├── shipping/route.ts
│   │       ├── payment/route.ts
│   │       ├── complete/route.ts
│   │       └── summary/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── globals.css
├── components/
│   ├── Checkout.tsx          # Main checkout component
│   ├── StepIndicator.tsx     # Progress indicator
│   ├── OrderSummary.tsx      # Order details panel
│   ├── AccountStep.tsx       # Step 1 form
│   ├── ShippingStep.tsx      # Step 2 form
│   ├── PaymentStep.tsx       # Step 3 form
│   ├── LanguageSwitcher.tsx  # i18n selector
│   └── index.ts              # Barrel export
├── lib/
│   ├── api.ts               # API client functions
│   └── schemas.ts           # Zod validation schemas
└── i18n/
    ├── config.ts            # i18next configuration
    └── locales/
        ├── en.json          # English translations
        └── es.json          # Spanish translations

__tests__/
└── checkout.happy-path.test.tsx  # Integration test

jest.config.js        # Jest configuration
jest.setup.js         # Jest setup file
package.json          # Dependencies and scripts
```

## Performance Optimizations

- **Code Splitting:** Components are lazy-loaded via Next.js
- **Image Optimization:** Tailwind CSS for minimal bundle
- **API Calls:** Simulated latency (400-800ms) for realistic UX
- **Form Optimization:** useForm with efficient re-renders
- **Caching:** Order summary fetched once per session

## Accessibility

- Semantic HTML elements
- Proper label associations with inputs
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management in forms
- Color contrast compliance
- Error message associations

## Security Considerations

- **Client-side Validation:** Prevents invalid submissions
- **Server-side Validation:** Validates all inputs
- **No Hardcoded Credentials:** API returns IDs, not secrets
- **Error Message Sanitization:** Generic messages to users
- **HTTPS Ready:** Production deployment ready

## Assumptions & Tradeoffs

### Assumptions Made

1. **Mock Payment:** dummy cards used only
2. **No Database:** Order data used is not stored
3. **Single Session:** No persistent user accounts
4. **No Analytics:** No tracking/analytics implemented
5. **No Email Verification:** Email validation is format only
6. **Basic Network Simulation:** Artificial latency via setTimeout

### Tradeoffs

1. **i18n Scope:** Only EN/ES
2. **Error Recovery:** Users must restart flow on critical errors
3. **Shipping Methods:** Limited to 3 options (extensible)
4. **Card Validation:** Basic format check only (use Stripe in production)
5. **Testing:** Happy path only (extensible to error scenarios)

## Troubleshooting

### Issue: Build fails with TypeScript errors
```bash
# Clearing Next.js cache
rm -rf .next
pnpm build
```

### Issue: i18n not loading translations
```bash
# Ensuring i18n config is imported in providers.tsx
# Checking translation file paths in src/i18n/locales/
```

### Issue: Tests not running
```bash
# Reinstalling jest and testing libraries
pnpm add -D jest @testing-library/react @testing-library/jest-dom
```

### Issue: Tailwind CSS not applied
```bash
# Rebuilding cache
rm -rf .next
pnpm dev
```

## In case of any support that might be needed

For issues or questions about the implementation:
1. Check the troubleshooting section above
2. Review test file for usage examples
3. Inspect browser console for errors
4. Check network tab in DevTools for API calls

## License

I created this project for interview/demonstration purposes only.

---