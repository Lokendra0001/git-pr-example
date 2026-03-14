import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c0866c44076708035a788f54fdd1885e@o4511036553035776.ingest.us.sentry.io/4511036553297920",

  debug: true,

  tracesSampleRate: 1,

  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: "dark",
      isNameRequired: true,
      isEmailRequired: true,
      buttonLabel: "Report a Bug",
      submitButtonLabel: "Send Feedback",
    }),
    Sentry.replayIntegration({
      // Masking protects user privacy by hiding text input
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
});

Sentry.metrics.count("user_action", 1);
Sentry.metrics.distribution("api_response_time", 150);
