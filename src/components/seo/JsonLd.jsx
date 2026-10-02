/** Structured data rendered into the page HTML, so crawlers that skip JavaScript still read it. */
export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
