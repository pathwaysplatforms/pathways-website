import { cookies } from "next/headers";

export type Locale = "en" | "fr";

const strings = {
  en: {
    landing_cta:     "Get started — it's free",
    landing_trust_1: "Based on official IRCC sources",
    landing_trust_2: "No account needed to explore",
    landing_trust_3: "Updated with every IRCC policy change",
  },
  fr: {
    landing_cta:     "Commencer — c'est gratuit",
    landing_trust_1: "Basé sur les sources officielles d'IRCC",
    landing_trust_2: "Aucun compte requis pour explorer",
    landing_trust_3: "Mis à jour à chaque changement de politique IRCC",
  },
} as const;

export type StringKey = keyof typeof strings.en;

function resolve(locale: Locale, key: StringKey): string {
  return (
    (strings[locale] as Record<string, string>)[key] ??
    (strings.en as Record<string, string>)[key] ??
    key
  );
}

export async function getT(locale?: Locale) {
  let resolvedLocale = locale;
  if (!resolvedLocale) {
    const cookieStore = await cookies();
    resolvedLocale = (cookieStore.get("pathways_locale")?.value as Locale) ?? "en";
  }
  const loc = resolvedLocale;
  return function t(key: StringKey): string {
    return resolve(loc, key);
  };
}
