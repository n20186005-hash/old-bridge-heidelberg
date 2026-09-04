import { useLocale } from 'next-intl';
import { absLocalizedUrl } from '@/lib/seo';
import { ATTRACTION, ENTITY_ID, SITE_OG_IMAGE, entityDescription } from '@/lib/entity';

/**
 * Renders the JSON-LD TouristAttraction block on the homepage.
 * The schema pins the entity (with a stable @id, image node, geo coordinates
 * and authoritative sameAs links) so Google can anchor it in the knowledge
 * graph and render a rich card in search results.
 */
export default function BridgeJsonLd() {
  const locale = useLocale();
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'CivicStructure'],
    '@id': ENTITY_ID,
    'name': ATTRACTION.fullName,
    'alternateName': ATTRACTION.alternateNames,
    'description': entityDescription(locale),
    'url': absLocalizedUrl(locale),
    'image': [SITE_OG_IMAGE],
    'isAccessibleForFree': true,
    'publicAccess': true,
    'telephone': ATTRACTION.phoneRaw,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': ATTRACTION.streetAddress,
      'addressLocality': ATTRACTION.city,
      'addressRegion': ATTRACTION.stateProvince,
      'postalCode': ATTRACTION.postalCode,
      'addressCountry': ATTRACTION.countryCode,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': ATTRACTION.geo.latitude,
      'longitude': ATTRACTION.geo.longitude,
    },
    'hasMap': ATTRACTION.mapsShareUrl,
    'sameAs': [
      ATTRACTION.mapsShareUrl,
      ATTRACTION.tourismUrl,
      ATTRACTION.cityUrl,
      ATTRACTION.wikipediaUrls.de,
      ATTRACTION.wikipediaUrls.en,
    ],
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      'opens': '00:00',
      'closes': '23:59',
    },
    'inLanguage': locale === 'zh' ? 'zh-CN' : locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
