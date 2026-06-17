/**
 * Central URL constants for the marketing site.
 * Import from here — never hardcode URLs in components.
 */

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const ONBOARDING_URL = `${APP_URL}/onboarding`;

export const MARKETING_URL =
  process.env.NEXT_PUBLIC_MARKETING_URL ?? "http://localhost:3001";
