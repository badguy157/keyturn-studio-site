import Link from 'next/link';

export const metadata = {
  title: 'Onboarding & Process | Keyturn Studio',
  description: 'What to expect: the 3-week makeover sprint, approvals, what we need, and how we measure results.',
};

export default function OnboardingPage() {
  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>How onboarding works</h1>
          <p>Simple, fast, and built around lifting <strong>website-direct</strong> share.</p>
        </div>
      </div>

      <main id="main">
        <section className="container grid section">
          <article className="card">
            <h3>1) Discovery → Audit</h3>
            <ul>
              <li>Quick audit request (<a href="/audit.html">form</a>)</li>
              <li>We send a 2–3 min Loom with 3 fixes + ROI estimate</li>
              <li>20-minute intro call (optional) to scope fit</li>
            </ul>
          </article>

          <article className="card">
            <h3>2) Makeover Sprint (≈3 weeks)</h3>
            <ul>
              <li>Core pages: Home, Rooms, Eat &amp; Drink, What&apos;s On, Story/FAQ</li>
              <li>Unified &quot;Book direct — best rate&quot; CTAs (sticky + hero)</li>
              <li>GA4 events (<code>book_click</code>, <code>booking_outbound</code>) + JSON-LD</li>
              <li>Speed &amp; accessibility pass; Digital Asset Pack</li>
            </ul>
          </article>

          <article className="card">
            <h3>3) Launch → Polish → Growth</h3>
            <ul>
              <li>Go-live + 30-day polish window for small tweaks</li>
              <li>Optional Care/Growth plan for CRO nudge & reporting</li>
              <li>Monthly KPI line: website-direct share (weighted), booking CTR, search clicks/CTR</li>
            </ul>
          </article>
        </section>

        <section className="container section">
          <div className="grid">
            <article className="card">
              <h3>What we need from you</h3>
              <ul>
                <li>Booking engine link (direct URL) &amp; PMS/engine name</li>
                <li>GA4 access; optional GSC access</li>
                <li>Logo, photos, menus (PDF), brand notes/voice</li>
                <li>Domain/DNS access for launch</li>
                <li>One decision-maker for weekly approvals</li>
              </ul>
            </article>

            <article className="card">
              <h3>Approvals cadence</h3>
              <ul>
                <li>Kickoff &amp; copy outline</li>
                <li>Design review (round 1)</li>
                <li>Build review (round 2)</li>
                <li>Pre-launch check</li>
              </ul>
              <p className="tiny">Guarantees &amp; cancellation terms are listed on the homepage.</p>
            </article>

            <article className="card">
              <h3>How we measure success</h3>
              <ul>
                <li><strong>Website-direct share (seasonally-weighted)</strong></li>
                <li>Outbound booking CTR &amp; funnel events</li>
                <li>Search clicks/CTR (GSC)</li>
              </ul>
              <p className="tiny">Pre-launch website-direct baseline currently: <strong>7.65%</strong>. Post-launch seasonal projection mid-case: <strong>~21.7%</strong>.</p>
            </article>
          </div>
        </section>

        <section className="container section">
          <div className="grid">
            <article className="card">
              <h3>Pricing & payment</h3>
              <ul>
                <li><strong>Core:</strong> $7,500 (0% 4-pay available)</li>
                <li><strong>Pro:</strong> $12,000</li>
                <li><strong>Care/Growth:</strong> $300–$900/mo</li>
              </ul>
              <p className="tiny">Work starts after first payment. You own domain, content, images, and code.</p>
            </article>

            <article className="card">
              <h3>FAQs</h3>
              <ul>
                <li><strong>ADR?</strong> <abbr title="Average Daily Rate — typical nightly room price before taxes/fees">Average Daily Rate</abbr>.</li>
                <li><strong>ALOS?</strong> <abbr title="Average Length of Stay">Average Length of Stay</abbr>.</li>
                <li><strong>Will this change my PMS/engine?</strong> No — we link to your existing engine.</li>
                <li><strong>Photos?</strong> Use yours or we can source/guide; we label staged/AI shots.</li>
                <li><strong>Data?</strong> GA4 only; no resale pixels.</li>
              </ul>
            </article>
          </div>
          <div className="buttons" style={{marginTop:'12px'}}>
            <a className="btn primary" href="/audit.html">Request your audit</a>
            <Link className="btn" href="/#results">See results</Link>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <a href="/audit.html#audit" className="sticky-cta" aria-label="Request an audit">Request audit</a>
    </>
  );
}
