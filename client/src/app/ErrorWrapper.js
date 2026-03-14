"use client";
import React from "react";
import { ErrorBoundary } from "@sentry/react";

const ErrorWrapper = ({ children }) => {
  return (
    <ErrorBoundary fallback={<p>Something Went Wrong!</p>}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorWrapper;
