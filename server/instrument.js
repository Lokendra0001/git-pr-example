import * as Sentry from "@sentry/node";
// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: "https://c0866c44076708035a788f54fdd1885e@o4511036553035776.ingest.us.sentry.io/4511036553297920",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
