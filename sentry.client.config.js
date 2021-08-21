import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://37ded038a57b4b9fb298ff89015192ef@o912422.ingest.sentry.io/5849453',
  tracesSampleRate: 1.0,
  debug: false,
  ignoreErrors: ['ResizeObserver loop limit exceeded'],
  environment: 'production'
});
