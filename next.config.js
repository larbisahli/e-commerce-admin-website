const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      'dropgala.com',
      'media.dropgala.com',
      'dropspace.sgp1.digitaloceanspaces.com'
    ],
    path: '/_next/image',
    loader: 'default'
  },
  env: {
    ADMIN_API_URL: 'https://admin-api.dropgala.com',
    MEDIA_URL_DEV: 'https://dropspace.sgp1.digitaloceanspaces.com',
    MEDIA_URL: 'https://media.dropgala.com',
    GTAG_MEASUREMENT_ID: '',
    FB_APPID: '',
    SENTRY_DSN:
      'https://37ded038a57b4b9fb298ff89015192ef@o912422.ingest.sentry.io/5849453',
    NEXT_PUBLIC_SENTRY_DSN:
      'https://37ded038a57b4b9fb298ff89015192ef@o912422.ingest.sentry.io/5849453'
  }
};

const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
