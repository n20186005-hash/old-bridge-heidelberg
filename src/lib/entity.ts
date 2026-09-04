import { SITE_URL } from './seo';

/**
 * Single point of truth for the geo/attraction entity behind this site
 * (used by JSON-LD, OG tags, the map section and canonical cross links).
 *
 * Fact sheet (Google Business / official sources, 2026):
 *   Old Bridge Heidelberg · Alte Brücke, 69117 Heidelberg, Germany
 *   Rating 4.8 (18,345 Google reviews) · Pedestrian bridge, free access 24/7
 */
export const ATTRACTION = {
  /** Domain-aligned international name. */
  fullName: 'Old Bridge Heidelberg',
  alternateNames: [
    'Old Bridge',
    'Alte Brücke',
    'Alte Brücke Heidelberg',
    'Karl-Theodor-Brücke',
    'Heidelberg Old Bridge',
  ],
  city: 'Heidelberg',
  stateProvince: 'Baden-Württemberg',
  country: 'Germany',
  countryCode: 'DE',
  postalCode: '69117',
  streetAddress: 'Alte Brücke',
  /** Full display address as used by Google. */
  displayAddress: 'Alte Brücke, 69117 Heidelberg, Germany',
  plusCode: 'CP75+RR Heidelberg, Germany',
  /** Google marker coordinates for the bridge. */
  geo: { latitude: 49.4145665, longitude: 8.7095062 },
  /** Tourist-Information Heidelberg (operated by Heidelberg Marketing GmbH). */
  phoneDisplay: '+49 6221 58 44 44',
  phoneRaw: '+4962215844444',
  mapsShareUrl: 'https://maps.app.goo.gl/E6sARLKkqxeeVSDH7',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.103128279865!2d8.7095062!3d49.4145665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c1063ab1517f%3A0x9ac61266a25ea352!2sOld%20Bridge%20Heidelberg!5e1!3m2!1sen!2s!4v1788534387834!5m2!1sen!2s',
  /** Official tourism portal of the City of Heidelberg (Heidelberg Marketing). */
  tourismUrl: 'https://www.heidelberg-marketing.de/',
  /** City of Heidelberg – official website. */
  cityUrl: 'https://www.heidelberg.de/',
  wikipediaUrls: {
    de: 'https://de.wikipedia.org/wiki/Alte_Br%C3%BCcke_(Heidelberg)',
    en: 'https://en.wikipedia.org/wiki/Heidelberg_Old_Bridge',
  },
  /** Primary visual for social cards & schema.image. */
  ogImagePath: '/gallery/old-bridge-heidelberg (1).jpg',
} as const;

/** Absolute URL of the hero photo (encoded for use in URLs). */
export const SITE_OG_IMAGE = `${SITE_URL}/gallery/old-bridge-heidelberg%20(1).jpg`;

/** @id anchor used in JSON-LD to pin this entity in the knowledge graph. */
export const ENTITY_ID = `${SITE_URL}/#attraction`;

/** Nearby landmarks used for the semantic cluster (template variable map). */
export const NEARBY_LANDMARKS = [
  'Heidelberg Castle',
  "Philosophers' Walk",
  'Old Town & Hauptstraße',
] as const;

/** Short, localized entity description for schema & og:description. */
export function entityDescription(locale: string): string {
  switch (locale) {
    case 'de':
      return 'Die Alte Brücke (Old Bridge Heidelberg) ist die berühmte historische Steinbrücke über den Neckar im Herzen von Heidelberg, Baden-Württemberg, Deutschland – Wahrzeichen der Stadt mit Blick auf Schloss und Altstadt.';
    case 'zh':
      return '海德堡老桥（Old Bridge Heidelberg / Alte Brücke）是横跨内卡河的著名历史石桥，位于德国巴登-符腾堡州海德堡市中心，是饱览海德堡城堡与老城风光的城市地标。';
    default:
      return 'Old Bridge Heidelberg is the famous historic stone bridge over the River Neckar in the heart of Heidelberg, Baden-Württemberg, Germany – the city\u2019s landmark with views of the castle and the Old Town.';
  }
}
