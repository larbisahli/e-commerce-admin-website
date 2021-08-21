import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const ProductionEnv = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: ProductionEnv ? SENTRY_DSN : '',
  tracesSampleRate: 1.0,
  debug: false,
  ignoreErrors: ['ResizeObserver loop limit exceeded'],
  environment: 'production'
});
