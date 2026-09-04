// Custom 404 (exported as /404.html). Kept language-neutral: it only offers a
// link back to the German start page, the site's default language.
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        background: '#faf8f4',
        color: '#234d5c',
      }}
    >
      <p style={{ fontSize: '5rem', fontWeight: 700, margin: 0, lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: '1.5rem', margin: '0.5rem 0 1rem', color: '#1f2937' }}>
        This page could not be found
      </h1>
      <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>
        Die Seite wurde nicht gefunden. Zurück zur Startseite:
      </p>
      <a
        href="/de"
        style={{
          display: 'inline-block',
          borderRadius: '9999px',
          background: '#234d5c',
          color: '#fff',
          padding: '0.6rem 1.5rem',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Old Bridge Heidelberg – Startseite
      </a>
    </main>
  );
}
