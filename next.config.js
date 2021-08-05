module.exports = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      'dropgala.com',
      'media.dropgala.com'
    ],
    path: '/_next/image',
    loader: 'default'
  },
  env: {
    ADMIN_API_URL: 'https://admin-api.dropgala.com',
    MEDIA_URL: 'https://media.dropgala.com',
    GTAG_MEASUREMENT_ID: '',
    FB_APPID: '',
    NEXT_PUBLIC_LOGROCKET_ID: '',
    SENTRY_DSN:
      'https://37ded038a57b4b9fb298ff89015192ef@o912422.ingest.sentry.io/5849453'
  }
};
